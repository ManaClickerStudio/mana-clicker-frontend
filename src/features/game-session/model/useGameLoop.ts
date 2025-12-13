import { useEffect, useRef } from "react";
import { useGameStore } from "./gameStore";

// Hook odpowiedzialny za główną pętlę gry - dodaje manę co sekundę
export const useGameLoop = (isActive: boolean) => {
  const incrementMana = useGameStore((s) => s.incrementMana);
  const currentMPSRef = useRef(0);

  // Synchronizacja MPS bez powodowania re-renderów
  useEffect(() => {
    return useGameStore.subscribe((state) => {
      currentMPSRef.current = state.state.currentMPS;
    });
  }, []);

  // Pętla dodająca manę
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

