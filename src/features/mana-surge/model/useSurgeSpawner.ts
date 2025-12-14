import { useEffect, useRef, useCallback } from "react";
import { useGameStore } from "@/features/game-session";

// Base spawn interval in milliseconds (5-15 minutes)
const MIN_SPAWN_INTERVAL = 5 * 60 * 1000;
const MAX_SPAWN_INTERVAL = 15 * 60 * 1000;

// Activity bonus - reduces interval when player is active
const ACTIVITY_BONUS_MULTIPLIER = 0.7;
const ACTIVITY_TIMEOUT = 30000; // 30 seconds of inactivity

export const useSurgeSpawner = (isActive: boolean) => {
  const spawnSurge = useGameStore((s) => s.spawnSurge);
  const activeSurge = useGameStore((s) => s.activeSurge);
  const permanentRunes = useGameStore((s) => s.state.permanentRunes);
  const talents = useGameStore((s) => s.state.talents);
  const staticTalents = useGameStore((s) => s.state.staticTalents);

  const lastActivityRef = useRef(Date.now());
  const spawnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track user activity
  useEffect(() => {
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("click", updateActivity);
    window.addEventListener("keydown", updateActivity);

    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("keydown", updateActivity);
    };
  }, []);

  // Calculate spawn interval with bonuses
  const getSpawnInterval = useCallback(() => {
    let baseInterval =
      MIN_SPAWN_INTERVAL +
      Math.random() * (MAX_SPAWN_INTERVAL - MIN_SPAWN_INTERVAL);

    // Apply rune bonus (RuneOfEvents = -25% interval = more spawns)
    const hasEventRune = permanentRunes?.includes("RuneOfEvents");
    if (hasEventRune) {
      baseInterval *= 0.75;
    }

    // Apply talent bonus (LuckyCharm = +15% spawn chance = -15% interval)
    const hasLuckyCharm = talents?.includes("LuckyCharm");
    if (hasLuckyCharm) {
      baseInterval *= 0.85;
    }

    // Apply activity bonus
    const isRecentlyActive =
      Date.now() - lastActivityRef.current < ACTIVITY_TIMEOUT;
    if (isRecentlyActive) {
      baseInterval *= ACTIVITY_BONUS_MULTIPLIER;
    }

    return baseInterval;
  }, [permanentRunes, talents]);

  // Schedule next surge spawn
  const scheduleNextSpawn = useCallback(() => {
    if (spawnTimeoutRef.current) {
      clearTimeout(spawnTimeoutRef.current);
    }

    const interval = getSpawnInterval();

    spawnTimeoutRef.current = setTimeout(() => {
      // Only spawn if no surge is currently active
      if (!activeSurge) {
        spawnSurge();
      }
      // Schedule next spawn
      scheduleNextSpawn();
    }, interval);
  }, [getSpawnInterval, spawnSurge, activeSurge]);

  // Start/stop spawner based on active state
  useEffect(() => {
    if (isActive) {
      scheduleNextSpawn();
    }

    return () => {
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current);
      }
    };
  }, [isActive, scheduleNextSpawn]);

  // Re-schedule when a surge is dismissed
  useEffect(() => {
    if (isActive && !activeSurge) {
      scheduleNextSpawn();
    }
  }, [isActive, activeSurge, scheduleNextSpawn]);
};
