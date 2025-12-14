import { useEffect, useRef } from "react";
import { useGameStore } from "@/features/game-session";
import { calculateBuildingCost } from "@/features/building-purchase";
import type { Building } from "@/entities/game";

const AUTO_BUY_INTERVAL = 1000; // Check every second

// Finds the best building to buy based on the current mode
const findTargetBuilding = (
  mode: "cheapest" | "mostEfficient" | "targetBuilding",
  targetBuildingId: string | null,
  staticBuildings: Building[],
  buildings: Record<string, number>,
  maxSpend: number
): { building: Building | null; cost: number } => {
  let targetBuilding: Building | null = null;
  let targetCost = Infinity;

  switch (mode) {
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
      if (targetBuildingId) {
        const building = staticBuildings.find((b) => b.id === targetBuildingId);
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

  return { building: targetBuilding, cost: targetCost };
};

// Handles automatic building purchases when unlocked and enabled
export const useAutoBuyer = (isActive: boolean) => {
  const autoBuyer = useGameStore((s) => s.state.autoBuyer);
  const buyBuilding = useGameStore((s) => s.buyBuilding);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isActive || !autoBuyer.unlocked || !autoBuyer.enabled) {
      return;
    }

    intervalRef.current = setInterval(() => {
      const currentState = useGameStore.getState().state;
      const {
        mana,
        buildings,
        staticBuildings,
        autoBuyer: currentAutoBuyer,
      } = currentState;

      if (!staticBuildings || staticBuildings.length === 0) return;

      const maxSpend = mana * (currentAutoBuyer.maxSpendPercent / 100);

      const { building: targetBuilding, cost: targetCost } = findTargetBuilding(
        currentAutoBuyer.mode,
        currentAutoBuyer.targetBuilding,
        staticBuildings,
        buildings,
        maxSpend
      );

      if (targetBuilding && targetCost <= mana) {
        buyBuilding(targetBuilding.id);
      }
    }, AUTO_BUY_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    isActive,
    autoBuyer.unlocked,
    autoBuyer.enabled,
    autoBuyer.mode,
    autoBuyer.targetBuilding,
    autoBuyer.maxSpendPercent,
    buyBuilding,
  ]);
};
