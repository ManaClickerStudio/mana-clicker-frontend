import { create } from "zustand";
import {
  GameState,
  UserBuildings,
  Building,
  Upgrade,
  Achievement,
  GameContextType,
} from "../types/game";
import gameService from "../services/gameService";

// Configuration
const COST_MULTIPLIER = 1.15; // 15% cost multiplier for buildings

export const calculateBuildingCost = (
  baseCost: number,
  currentCount: number
): number => {
  return Math.ceil(baseCost * Math.pow(COST_MULTIPLIER, currentCount));
};

// Initial Game State
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

// Calculations for MPS/MPC
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
          if ((upgrade as any).target) {
            const targetId = (upgrade as any).target;
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

// Game Store Definition
export const useGameStore = create<GameContextType>((set, get) => ({
  state: {
    ...INITIAL_GAME_STATE,
    staticBuildings: [],
    staticUpgrades: [],
    staticAchievements: [],
  } as GameState,
  isGameLoading: false,
  error: null,

  loadGame: async () => {
    set({ isGameLoading: true, error: null });
    try {
      const [staticData, userData] = await Promise.all([
        gameService.getStaticData(),
        gameService.loadGame(),
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
    } catch (err: any) {
      console.error("Error loading game:", err);
      set({
        isGameLoading: false,
        error: err.response?.data?.message || "Failed to load game data.",
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

  saveGame: async () => {
    const state = get().state;

    const {
      staticBuildings,
      staticUpgrades,
      staticAchievements,
      currentMPS,
      currentMPC,
      ...stateToSave
    } = state;

    const finalStateToSave = { ...stateToSave, lastUpdate: Date.now() };

    try {
      await gameService.saveGame(finalStateToSave);
      set((store) => ({
        state: { ...store.state, lastUpdate: finalStateToSave.lastUpdate },
      }));
    } catch (err: any) {
      console.error("Auto-save failed:", err);
    }
  },
}));
