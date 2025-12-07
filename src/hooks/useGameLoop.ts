import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

// Game Loop
export const useGameLoop = (isAuthenticated: boolean) => {
  const { state, incrementMana, saveGame, isGameLoading } = useGameStore();

  // Mana Increment Loop
  useEffect(() => {
    if (isAuthenticated && !isGameLoading) {
      const interval = setInterval(() => {
        const mps = state.currentMPS;
        if (mps > 0) {
          incrementMana(mps);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, isGameLoading, state.currentMPS, incrementMana]);

  // Auto-save Loop
  useEffect(() => {
    if (isAuthenticated && !isGameLoading) {
      const saveInterval = setInterval(saveGame, 60000); // 1 minute
      return () => clearInterval(saveInterval);
    }
  }, [isAuthenticated, isGameLoading, saveGame]);
};
