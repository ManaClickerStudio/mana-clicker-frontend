import { create } from "zustand";
import type {
  GameState,
  Building,
  Upgrade,
  GameContextType,
  PurchaseMultiplier,
  SurgeType,
  ActiveSurge,
  AutoBuyer,
} from "@/entities/game";
import { gameService } from "@/shared/api";
import type { UserGameState } from "@/shared/api";
import {
  calculateBuildingCost,
  calculateMultipleCost,
} from "@/features/building-purchase";

// Initial game state defaults
const INITIAL_GAME_STATE: GameState = {
  mana: 0,
  totalManaEarned: 0,
  baseManaPerClick: 1,
  buildings: {},
  upgrades: [],
  achievements: [],
  lastUpdate: Date.now(),
  currentMPS: 0,
  currentMPC: 1,
  currentEssence: 0,
  totalEssenceEarned: 0,
  ascensionCount: 0,
  talents: [],
  permanentRunes: [],
  autoClicker: {
    unlocked: false,
    enabled: false,
    level: 1,
  },
  autoBuyer: {
    unlocked: false,
    enabled: false,
    mode: "cheapest",
    targetBuilding: null,
    maxSpendPercent: 10,
  },
  activeBoosts: [],
  activeSurge: null,
  staticBuildings: [],
  staticUpgrades: [],
  staticAchievements: [],
  staticSurgeTypes: [],
  staticTalents: [],
  staticPermanentRunes: [],
};

// Calculates MPS and MPC based on buildings, upgrades, talents and active boosts
const calculateProduction = (
  state: GameState
): { currentMPS: number; currentMPC: number } => {
  const {
    staticBuildings,
    staticUpgrades,
    buildings,
    upgrades,
    baseManaPerClick,
    talents,
    staticTalents,
    activeBoosts,
  } = state;

  if (!staticBuildings || staticBuildings.length === 0) {
    return { currentMPS: 0, currentMPC: baseManaPerClick };
  }

  let globalMPSMultiplier = 1;
  let clickMultiplier = 1;
  let mpsFromClick = 0;

  const buildingMultipliers: Record<string, number> = {};

  // Apply upgrade bonuses
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
          if (upgrade.target) {
            if (!buildingMultipliers[upgrade.target]) {
              buildingMultipliers[upgrade.target] = 1;
            }
            buildingMultipliers[upgrade.target] *= upgrade.bonus;
          }
          break;
      }
    }
  });

  // Apply talent bonuses
  staticTalents.forEach((talent) => {
    if (talents.includes(talent.id)) {
      if (talent.effect.type === "mpc_mult" && talent.effect.value) {
        clickMultiplier *= talent.effect.value;
      }
    }
  });

  // Apply active boost multipliers
  activeBoosts.forEach((boost) => {
    if (boost.expiresAt > Date.now()) {
      if (boost.type === "ClickFrenzy") {
        clickMultiplier *= boost.multiplier;
      } else if (boost.type === "GoldenOrb") {
        globalMPSMultiplier *= boost.multiplier;
      } else if (boost.type === "BuildingBoost" && boost.target) {
        if (!buildingMultipliers[boost.target]) {
          buildingMultipliers[boost.target] = 1;
        }
        buildingMultipliers[boost.target] *= boost.multiplier;
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

// Calculates essence gain from ascension based on total mana earned
const calculateEssenceGain = (totalManaEarned: number): number => {
  if (totalManaEarned < 1000000) return 0;
  return Math.floor(Math.log10(totalManaEarned) * 10 - 50);
};

// Helper to extract user state for saving
const extractUserState = (state: GameState): UserGameState => {
  const {
    staticBuildings: _sb,
    staticUpgrades: _su,
    staticAchievements: _sa,
    staticSurgeTypes: _sst,
    staticTalents: _st,
    staticPermanentRunes: _spr,
    currentMPS: _mps,
    currentMPC: _mpc,
    ...userState
  } = state;
  return { ...userState, lastUpdate: Date.now() };
};

// Main game store using Zustand
export const useGameStore = create<GameContextType>((set, get) => ({
  state: INITIAL_GAME_STATE,
  isGameLoading: false,
  error: null,
  purchaseMultiplier: 1 as PurchaseMultiplier,
  activeSurge: null,

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

      // Merge user data with defaults for missing fields
      const mergedUserData = {
        ...INITIAL_GAME_STATE,
        ...userData,
      };

      const newState: GameState = {
        ...mergedUserData,
        staticBuildings: staticData.buildings,
        staticUpgrades: staticData.upgrades,
        staticAchievements: staticData.achievements,
        staticSurgeTypes: staticData.surgeTypes,
        staticTalents: staticData.talents,
        staticPermanentRunes: staticData.permanentRunes,
        currentMPS: 0,
        currentMPC: 0,
        lastUpdate: Date.now(),
      };

      const { currentMPS, currentMPC } = calculateProduction(newState);
      newState.currentMPS = currentMPS;
      newState.currentMPC = currentMPC;

      set({
        state: newState,
        isGameLoading: false,
        activeSurge: newState.activeSurge,
      });
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

        const newState: GameState = {
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

        const newState: GameState = {
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

        const newState: GameState = {
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
    const stateToSave = extractUserState(state);

    try {
      await gameService.saveGame(stateToSave, token);
      set((store) => ({
        state: { ...store.state, lastUpdate: stateToSave.lastUpdate },
      }));
    } catch (err: unknown) {
      console.error("Auto-save failed:", err);
    }
  },

  spawnSurge: () => {
    const state = get().state;
    const surgeTypes = state.staticSurgeTypes;

    if (!surgeTypes || surgeTypes.length === 0 || state.activeSurge) return;

    // Pick random surge based on probability
    const random = Math.random();
    let cumulative = 0;

    for (const surge of surgeTypes) {
      cumulative += surge.probability;
      if (random <= cumulative) {
        const activeSurge: ActiveSurge = {
          type: surge.id,
          expiresAt: Date.now() + surge.timeToClick * 1000,
        };
        set((store) => ({
          state: { ...store.state, activeSurge },
          activeSurge,
        }));
        return;
      }
    }

    // Fallback to first surge type
    const fallbackSurge = surgeTypes[0];
    const activeSurge: ActiveSurge = {
      type: fallbackSurge.id,
      expiresAt: Date.now() + fallbackSurge.timeToClick * 1000,
    };
    set((store) => ({
      state: { ...store.state, activeSurge },
      activeSurge,
    }));
  },

  claimSurge: async (surgeType: SurgeType, token: string) => {
    const state = get().state;
    const surgeData = state.staticSurgeTypes.find((s) => s.id === surgeType);

    if (!surgeData || !state.activeSurge) return;

    try {
      await gameService.claimSurge(surgeType, token);

      // Apply surge effect locally
      const effect = surgeData.effect;
      let newState = { ...state, activeSurge: null };

      if (effect.type === "instant_mana") {
        // Instant mana bonus based on MPS
        const bonus = state.currentMPS * 900;
        newState.mana += bonus;
        newState.totalManaEarned += bonus;
      } else if (effect.duration && effect.multiplier) {
        // Timed boost
        const newBoost = {
          type: surgeType,
          multiplier: effect.multiplier,
          expiresAt: Date.now() + effect.duration * 1000,
          target: effect.targetRandom
            ? state.staticBuildings[
                Math.floor(Math.random() * state.staticBuildings.length)
              ]?.id
            : undefined,
        };
        newState.activeBoosts = [...state.activeBoosts, newBoost];
      }

      const production = calculateProduction(newState);

      set({
        state: { ...newState, ...production },
        activeSurge: null,
      });
    } catch (err) {
      console.error("Failed to claim surge:", err);
    }
  },

  dismissSurge: () => {
    set((store) => ({
      state: { ...store.state, activeSurge: null },
      activeSurge: null,
    }));
  },

  getEssencePreview: () => {
    const { totalManaEarned } = get().state;
    return calculateEssenceGain(totalManaEarned);
  },

  performAscension: async (token: string) => {
    const state = get().state;
    const essenceGain = calculateEssenceGain(state.totalManaEarned);

    if (essenceGain <= 0) return;

    try {
      const newUserData = await gameService.performAscension(token);

      // Merge with current static data and recalculate
      const newState: GameState = {
        ...INITIAL_GAME_STATE,
        ...newUserData,
        staticBuildings: state.staticBuildings,
        staticUpgrades: state.staticUpgrades,
        staticAchievements: state.staticAchievements,
        staticSurgeTypes: state.staticSurgeTypes,
        staticTalents: state.staticTalents,
        staticPermanentRunes: state.staticPermanentRunes,
      };

      const production = calculateProduction(newState);

      set({
        state: { ...newState, ...production },
        activeSurge: null,
      });
    } catch (err) {
      console.error("Ascension failed:", err);
    }
  },

  buyTalent: async (talentId: string, token: string) => {
    const state = get().state;
    const talent = state.staticTalents.find((t) => t.id === talentId);

    if (!talent || state.talents.includes(talentId)) return;
    if (state.currentEssence < talent.essenceCost) return;

    // Check requirements
    const requirementsMet = talent.requires.every((req) =>
      state.talents.includes(req)
    );
    if (!requirementsMet) return;

    try {
      await gameService.buyTalent(talentId, token);

      const newState: GameState = {
        ...state,
        talents: [...state.talents, talentId],
        currentEssence: state.currentEssence - talent.essenceCost,
      };

      const production = calculateProduction(newState);

      set({
        state: { ...newState, ...production },
      });
    } catch (err) {
      console.error("Failed to buy talent:", err);
    }
  },

  resetTalents: async (token: string) => {
    const state = get().state;

    if (state.talents.length === 0) return;

    try {
      const { refundedEssence } = await gameService.resetTalents(token);

      const newState: GameState = {
        ...state,
        talents: [],
        currentEssence: state.currentEssence + refundedEssence,
      };

      const production = calculateProduction(newState);

      set({
        state: { ...newState, ...production },
      });
    } catch (err) {
      console.error("Failed to reset talents:", err);
    }
  },

  buyRune: async (runeId: string, token: string) => {
    const state = get().state;
    const rune = state.staticPermanentRunes.find((r) => r.id === runeId);

    if (!rune) return;
    if (state.currentEssence < rune.cost) return;

    // Check ascension requirement
    if (
      rune.requiredAscensions &&
      state.ascensionCount < rune.requiredAscensions
    ) {
      return;
    }

    // Check max level
    const currentLevel = state.permanentRunes.filter(
      (r) => r === runeId
    ).length;
    if (currentLevel >= rune.maxLevel) return;

    try {
      await gameService.buyRune(runeId, token);

      const newState: GameState = {
        ...state,
        permanentRunes: [...state.permanentRunes, runeId],
        currentEssence: state.currentEssence - rune.cost,
      };

      // Apply rune effect for auto-clicker unlock
      if (rune.effect.type === "unlock_autoclicker") {
        newState.autoClicker = { ...newState.autoClicker, unlocked: true };
      }
      if (rune.effect.type === "unlock_autobuyer") {
        newState.autoBuyer = { ...newState.autoBuyer, unlocked: true };
      }

      const production = calculateProduction(newState);

      set({
        state: { ...newState, ...production },
      });
    } catch (err) {
      console.error("Failed to buy rune:", err);
    }
  },

  toggleAutoClicker: async (enabled: boolean, token: string) => {
    const state = get().state;

    if (!state.autoClicker.unlocked) return;

    try {
      await gameService.toggleAutoClicker(enabled, token);

      set((store) => ({
        state: {
          ...store.state,
          autoClicker: { ...store.state.autoClicker, enabled },
        },
      }));
    } catch (err) {
      console.error("Failed to toggle auto-clicker:", err);
    }
  },

  configureAutoBuyer: async (config: Partial<AutoBuyer>, token: string) => {
    const state = get().state;

    if (!state.autoBuyer.unlocked) return;

    try {
      await gameService.configureAutoBuyer(config, token);

      set((store) => ({
        state: {
          ...store.state,
          autoBuyer: { ...store.state.autoBuyer, ...config },
        },
      }));
    } catch (err) {
      console.error("Failed to configure auto-buyer:", err);
    }
  },
}));
