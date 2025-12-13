import { useEffect, useRef } from "react";
import { useGameStore } from "./gameStore";

/**
 * Game loop hook that increments mana based on current MPS
 * @param isActive - Whether the game loop should be active
 */
export const useGameLoop = (isActive: boolean) => {
  const incrementMana = useGameStore((s) => s.incrementMana);
  const currentMPSRef = useRef(0);

  // Keep MPS in sync without causing re-renders
  useEffect(() => {
    return useGameStore.subscribe((state) => {
      currentMPSRef.current = state.state.currentMPS;
    });
  }, []);

  // Mana Increment Loop
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const mps = currentMPSRef.current;
        if (mps > 0) {
          incrementMana(mps);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive, incrementMana]);
};

