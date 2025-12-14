import { useEffect, useRef } from "react";
import { useGameStore } from "@/features/game-session";
import { calculateBuildingCost } from "@/features/building-purchase";

// Auto-clicker settings
const AUTO_CLICK_EFFICIENCY = 0.25; // 25% of normal MPC

// Auto-buyer settings
const AUTO_BUY_INTERVAL = 1000; // Check every second

export const useAutomation = (isActive: boolean) => {
  const state = useGameStore((s) => s.state);
  const incrementMana = useGameStore((s) => s.incrementMana);
  const buyBuilding = useGameStore((s) => s.buyBuilding);

  const autoClickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoBuyIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-Clicker logic
  useEffect(() => {
    if (!isActive || !state.autoClicker.unlocked || !state.autoClicker.enabled) {
      if (autoClickIntervalRef.current) {
        clearInterval(autoClickIntervalRef.current);
        autoClickIntervalRef.current = null;
      }
      return;
    }

    const clicksPerSecond = state.autoClicker.level;
    const intervalMs = 1000 / clicksPerSecond;

    autoClickIntervalRef.current = setInterval(() => {
      const currentMPC = useGameStore.getState().state.currentMPC;
      const manaGained = currentMPC * AUTO_CLICK_EFFICIENCY;
      incrementMana(manaGained);
    }, intervalMs);

    return () => {
      if (autoClickIntervalRef.current) {
        clearInterval(autoClickIntervalRef.current);
      }
    };
  }, [
    isActive,
    state.autoClicker.unlocked,
    state.autoClicker.enabled,
    state.autoClicker.level,
    incrementMana,
  ]);

  // Auto-Buyer logic
  useEffect(() => {
    if (!isActive || !state.autoBuyer.unlocked || !state.autoBuyer.enabled) {
      if (autoBuyIntervalRef.current) {
        clearInterval(autoBuyIntervalRef.current);
        autoBuyIntervalRef.current = null;
      }
      return;
    }

    autoBuyIntervalRef.current = setInterval(() => {
      const currentState = useGameStore.getState().state;
      const { mana, buildings, staticBuildings, autoBuyer } = currentState;

      if (!staticBuildings || staticBuildings.length === 0) return;

      const maxSpend = mana * (autoBuyer.maxSpendPercent / 100);

      // Find the building to buy based on mode
      let targetBuilding = null;
      let targetCost = Infinity;

      switch (autoBuyer.mode) {
        case "cheapest": {
          for (const building of staticBuildings) {
            const count = buildings[building.id] || 0;
            const cost = calculateBuildingCost(building.baseCost, count);
            if (cost <= maxSpend && cost < targetCost) {
              targetBuilding = building;
              targetCost = cost;
            }
          }
          break;
        }

        case "mostEfficient": {
          let bestEfficiency = 0;
          for (const building of staticBuildings) {
            const count = buildings[building.id] || 0;
            const cost = calculateBuildingCost(building.baseCost, count);
            if (cost <= maxSpend) {
              const efficiency = building.baseMps / cost;
              if (efficiency > bestEfficiency) {
                bestEfficiency = efficiency;
                targetBuilding = building;
                targetCost = cost;
              }
            }
          }
          break;
        }

        case "targetBuilding": {
          if (autoBuyer.targetBuilding) {
            const building = staticBuildings.find(
              (b) => b.id === autoBuyer.targetBuilding
            );
            if (building) {
              const count = buildings[building.id] || 0;
              const cost = calculateBuildingCost(building.baseCost, count);
              if (cost <= maxSpend) {
                targetBuilding = building;
                targetCost = cost;
              }
            }
          }
          break;
        }
      }

      // Buy the building if we found one
      if (targetBuilding && targetCost <= mana) {
        buyBuilding(targetBuilding.id);
      }
    }, AUTO_BUY_INTERVAL);

    return () => {
      if (autoBuyIntervalRef.current) {
        clearInterval(autoBuyIntervalRef.current);
      }
    };
  }, [
    isActive,
    state.autoBuyer.unlocked,
    state.autoBuyer.enabled,
    state.autoBuyer.mode,
    state.autoBuyer.targetBuilding,
    state.autoBuyer.maxSpendPercent,
    buyBuilding,
  ]);
};

