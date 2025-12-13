import { create } from "zustand";
import type {
  GameState,
  Building,
  Upgrade,
  GameContextType,
  PurchaseMultiplier,
} from "@/entities/game";
import { gameService } from "@/shared/api";
import {
  calculateBuildingCost,
  calculateMultipleCost,
} from "@/features/building-purchase";

// Początkowy stan gry
const INITIAL_GAME_STATE: Omit<
  GameState,
  "staticBuildings" | "staticUpgrades" | "staticAchievements"
> = {
  mana: 0,
  totalManaEarned: 0,
  baseManaPerClick: 1,
  buildings: {},
  upgrades: [],
  achievements: [],
  currentMPS: 0,
  currentMPC: 1,
  lastUpdate: Date.now(),
};

// Oblicza produkcję MPS i MPC na podstawie budynków i ulepszeń
const calculateProduction = (
  state: GameState
): { currentMPS: number; currentMPC: number } => {
  const {
    staticBuildings,
    staticUpgrades,
    buildings,
    upgrades,
    baseManaPerClick,
  } = state;

  if (!staticBuildings || staticBuildings.length === 0) {
    return { currentMPS: 0, currentMPC: baseManaPerClick };
  }

  let globalMPSMultiplier = 1;
  let clickMultiplier = 1;
  let mpsFromClick = 0;

  const buildingMultipliers: Record<string, number> = {};

  staticUpgrades.forEach((upgrade: Upgrade) => {
    if (upgrades.includes(upgrade.id)) {
      switch (upgrade.type) {
        case "global_mps":
          globalMPSMultiplier *= upgrade.bonus;
          break;
        case "click":
          clickMultiplier *= upgrade.bonus;
          break;
        case "click_mps":
          mpsFromClick += upgrade.bonus;
          break;
        case "building":
          if ((upgrade as Upgrade).target) {
            const targetId = (upgrade as Upgrade).target!;
            if (!buildingMultipliers[targetId]) {
              buildingMultipliers[targetId] = 1;
            }
            buildingMultipliers[targetId] *= upgrade.bonus;
          }
          break;
      }
    }
  });

  let totalMPS = 0;
  staticBuildings.forEach((building: Building) => {
    const count = buildings[building.id] || 0;
    const buildingSpecificMultiplier = buildingMultipliers[building.id] || 1;

    totalMPS += count * building.baseMps * buildingSpecificMultiplier;
  });

  const finalMPS = totalMPS * globalMPSMultiplier;

  const finalMPC = baseManaPerClick * clickMultiplier + finalMPS * mpsFromClick;

  return {
    currentMPS: finalMPS,
    currentMPC: finalMPC,
  };
};

// Główny store gry (Zustand)
export const useGameStore = create<GameContextType>((set, get) => ({
  state: {
    ...INITIAL_GAME_STATE,
    staticBuildings: [],
    staticUpgrades: [],
    staticAchievements: [],
  } as GameState,
  isGameLoading: false,
  error: null,
  purchaseMultiplier: 1 as PurchaseMultiplier,

  setPurchaseMultiplier: (multiplier: PurchaseMultiplier) => {
    set({ purchaseMultiplier: multiplier });
  },

  loadGame: async (token: string) => {
    set({ isGameLoading: true, error: null });
    try {
      const [staticData, userData] = await Promise.all([
        gameService.getStaticData(),
        gameService.loadGame(token),
      ]);

      let newState: GameState = {
        ...userData,
        staticBuildings: staticData.buildings,
        staticUpgrades: staticData.upgrades,
        staticAchievements: staticData.achievements,
        currentMPS: 0,
        currentMPC: 0,
        lastUpdate: Date.now(),
      };

      const { currentMPS, currentMPC } = calculateProduction(newState);
      newState.currentMPS = currentMPS;
      newState.currentMPC = currentMPC;

      set({ state: newState, isGameLoading: false });
    } catch (err: unknown) {
      console.error("Error loading game:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load game data.";
      set({
        isGameLoading: false,
        error: errorMessage,
      });
    }
  },

  incrementMana: (amount: number) => {
    set((store) => ({
      state: {
        ...store.state,
        mana: store.state.mana + amount,
        totalManaEarned: store.state.totalManaEarned + amount,
      },
    }));
  },

  clickMana: () => {
    const mpc = get().state.currentMPC;
    get().incrementMana(mpc);
  },

  buyBuilding: (buildingId: string) => {
    set((store) => {
      const state = store.state;
      const building = state.staticBuildings.find((b) => b.id === buildingId);

      if (!building) return store;

      const currentCount = state.buildings[buildingId] || 0;

      const cost = calculateBuildingCost(building.baseCost, currentCount);

      if (state.mana >= cost) {
        const newBuildings = {
          ...state.buildings,
          [buildingId]: currentCount + 1,
        };

        let newState: GameState = {
          ...state,
          mana: state.mana - cost,
          buildings: newBuildings,
        };

        const production = calculateProduction(newState);

        return {
          state: {
            ...newState,
            ...production,
          },
        };
      }

      return store;
    });
  },

  buyMultipleBuildings: (buildingId: string, count: number) => {
    set((store) => {
      const state = store.state;
      const building = state.staticBuildings.find((b) => b.id === buildingId);

      if (!building || count <= 0) return store;

      const currentCount = state.buildings[buildingId] || 0;
      const totalCost = calculateMultipleCost(
        building.baseCost,
        currentCount,
        count
      );

      if (state.mana >= totalCost) {
        const newBuildings = {
          ...state.buildings,
          [buildingId]: currentCount + count,
        };

        let newState: GameState = {
          ...state,
          mana: state.mana - totalCost,
          buildings: newBuildings,
        };

        const production = calculateProduction(newState);

        return {
          state: {
            ...newState,
            ...production,
          },
        };
      }

      return store;
    });
  },

  buyUpgrade: (upgradeId: string) => {
    set((store) => {
      const state = store.state;
      const upgrade = state.staticUpgrades.find((u) => u.id === upgradeId);

      if (!upgrade) return store;

      const isOwned = state.upgrades.includes(upgradeId);

      if (!isOwned && state.mana >= upgrade.cost) {
        const newUpgrades = [...state.upgrades, upgradeId];

        let newState: GameState = {
          ...state,
          mana: state.mana - upgrade.cost,
          upgrades: newUpgrades,
        };

        const production = calculateProduction(newState);

        return {
          state: {
            ...newState,
            ...production,
          },
        };
      }
      return store;
    });
  },

  saveGame: async (token: string) => {
    const state = get().state;

    const {
      staticBuildings,
      staticUpgrades,
      staticAchievements,
      currentMPS,
      currentMPC,
      ...stateToSave
    } = state;

    void staticBuildings;
    void staticUpgrades;
    void staticAchievements;
    void currentMPS;
    void currentMPC;

    const finalStateToSave = { ...stateToSave, lastUpdate: Date.now() };

    try {
      await gameService.saveGame(finalStateToSave, token);
      set((store) => ({
        state: { ...store.state, lastUpdate: finalStateToSave.lastUpdate },
      }));
    } catch (err: unknown) {
      console.error("Auto-save failed:", err);
    }
  },
}));
