import { useEffect, useRef } from "react";
import { useGameStore } from "./gameStore";

// Main game loop - adds passive mana every second based on MPS
export const useGameLoop = (isActive: boolean) => {
  const incrementMana = useGameStore((s) => s.incrementMana);
  const currentMPSRef = useRef(0);

  // Sync MPS without causing re-renders
  useEffect(() => {
    return useGameStore.subscribe((state) => {
      currentMPSRef.current = state.state.currentMPS;
    });
  }, []);

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
