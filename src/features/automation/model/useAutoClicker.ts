import { useEffect, useRef } from "react";
import { useGameStore } from "@/features/game-session";

const AUTO_CLICK_EFFICIENCY = 0.25; // 25% of normal MPC

// Handles automatic clicking when unlocked and enabled
export const useAutoClicker = (isActive: boolean) => {
  const autoClicker = useGameStore((s) => s.state.autoClicker);
  const incrementMana = useGameStore((s) => s.incrementMana);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isActive || !autoClicker.unlocked || !autoClicker.enabled) {
      return;
    }

    const clicksPerSecond = autoClicker.level;
    const intervalMs = 1000 / clicksPerSecond;

    intervalRef.current = setInterval(() => {
      const currentMPC = useGameStore.getState().state.currentMPC;
      const manaGained = currentMPC * AUTO_CLICK_EFFICIENCY;
      incrementMana(manaGained);
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    isActive,
    autoClicker.unlocked,
    autoClicker.enabled,
    autoClicker.level,
    incrementMana,
  ]);
};
