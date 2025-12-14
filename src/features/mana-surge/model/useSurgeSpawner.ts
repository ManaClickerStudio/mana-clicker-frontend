import { useEffect, useRef } from "react";
import { useGameStore } from "@/features/game-session";

// Spawn interval range in milliseconds (5-15 minutes)
const MIN_SPAWN_INTERVAL = 5 * 60 * 1000;
const MAX_SPAWN_INTERVAL = 15 * 60 * 1000;
const ACTIVITY_BONUS_MULTIPLIER = 0.7;
const ACTIVITY_TIMEOUT = 30000;

// Handles spawning of mana surges at random intervals
export const useSurgeSpawner = (isActive: boolean) => {
  const lastActivityRef = useRef(Date.now());
  const spawnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

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

  // Calculates spawn interval with rune, talent and activity bonuses
  const getSpawnInterval = (): number => {
    const state = useGameStore.getState().state;
    const permanentRunes = state.permanentRunes;
    const talents = state.talents;

    let baseInterval =
      MIN_SPAWN_INTERVAL +
      Math.random() * (MAX_SPAWN_INTERVAL - MIN_SPAWN_INTERVAL);

    if (permanentRunes?.includes("RuneOfEvents")) {
      baseInterval *= 0.75;
    }

    if (talents?.includes("LuckyCharm")) {
      baseInterval *= 0.85;
    }

    const isRecentlyActive =
      Date.now() - lastActivityRef.current < ACTIVITY_TIMEOUT;
    if (isRecentlyActive) {
      baseInterval *= ACTIVITY_BONUS_MULTIPLIER;
    }

    return baseInterval;
  };

  const scheduleNextSpawn = () => {
    if (spawnTimeoutRef.current) {
      clearTimeout(spawnTimeoutRef.current);
      spawnTimeoutRef.current = null;
    }

    if (!isActiveRef.current) return;

    const interval = getSpawnInterval();

    spawnTimeoutRef.current = setTimeout(() => {
      const store = useGameStore.getState();
      const activeSurge = store.activeSurge;

      if (!activeSurge) {
        store.spawnSurge();
      }

      scheduleNextSpawn();
    }, interval);
  };

  useEffect(() => {
    if (isActive) {
      scheduleNextSpawn();
    }

    return () => {
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current);
        spawnTimeoutRef.current = null;
      }
    };
  }, [isActive]);
};
