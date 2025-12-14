// Re-export all types from shared
export type {
  // Auth
  UserData,
  AuthResponse,
  // Static Data
  UpgradeType,
  AchievementCondition,
  Building,
  Upgrade,
  Achievement,
  // Surge
  SurgeType,
  SurgeEffect,
  StaticSurgeType,
  ActiveSurge,
  ActiveBoost,
  // Talents
  TalentPath,
  TalentEffect,
  Talent,
  // Runes
  RuneEffect,
  PermanentRune,
  // Automation
  AutoClicker,
  AutoBuyerMode,
  AutoBuyer,
  // Game State
  UserBuildings,
  GameState,
  PurchaseMultiplier,
} from "@/shared/types";

// Typy autentykacji (dodatkowe)
export interface AuthVerifyResponse {
  success: boolean;
  username: string;
}

export interface AuthContextType {
  user: { id: string; username: string } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<{ token: string; user: { id: string; username: string } }>;
  register: (
    username: string,
    password: string
  ) => Promise<{ token: string; user: { id: string; username: string } }>;
  logout: () => void;
}

// Typy kontekstu gry
import type {
  GameState,
  PurchaseMultiplier,
  SurgeType,
  AutoBuyer,
} from "@/shared/types";

export interface GameContextType {
  // State
  state: GameState;
  isGameLoading: boolean;
  error: string | null;
  purchaseMultiplier: PurchaseMultiplier;
  activeSurge: { type: SurgeType; expiresAt: number } | null;

  // Basic actions
  clickMana: () => void;
  incrementMana: (amount: number) => void;
  setPurchaseMultiplier: (multiplier: PurchaseMultiplier) => void;

  // Building actions
  buyBuilding: (buildingId: string) => void;
  buyMultipleBuildings: (buildingId: string, count: number) => void;

  // Upgrade actions
  buyUpgrade: (upgradeId: string) => void;

  // Persistence
  loadGame: (token: string) => Promise<void>;
  saveGame: (token: string) => Promise<void>;

  // Surge actions
  spawnSurge: () => void;
  claimSurge: (surgeType: SurgeType, token: string) => Promise<void>;
  dismissSurge: () => void;

  // Ascension actions
  getEssencePreview: () => number;
  performAscension: (token: string) => Promise<void>;

  // Talent actions
  buyTalent: (talentId: string, token: string) => Promise<void>;
  resetTalents: (token: string) => Promise<void>;

  // Rune actions
  buyRune: (runeId: string, token: string) => Promise<void>;

  // Automation actions
  toggleAutoClicker: (enabled: boolean, token: string) => Promise<void>;
  configureAutoBuyer: (
    config: Partial<AutoBuyer>,
    token: string
  ) => Promise<void>;
}
