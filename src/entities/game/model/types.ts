export type {
  UpgradeType,
  AchievementCondition,
  Building,
  Upgrade,
  Achievement,
  UserBuildings,
  GameState,
  PurchaseMultiplier,
} from "@/shared/types";

// Typy autentykacji
export interface UserData {
  id: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: UserData;
  message?: string;
}

export interface AuthVerifyResponse {
  success: boolean;
  username: string;
}

export interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<AuthResponse>;
  register: (username: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
}

// Typy kontekstu gry
import type { GameState, PurchaseMultiplier } from "@/shared/types";

export interface GameContextType {
  state: GameState;
  isGameLoading: boolean;
  error: string | null;
  purchaseMultiplier: PurchaseMultiplier;
  clickMana: () => void;
  buyBuilding: (buildingId: string) => void;
  buyMultipleBuildings: (buildingId: string, count: number) => void;
  buyUpgrade: (upgradeId: string) => void;
  loadGame: (token: string) => Promise<void>;
  incrementMana: (amount: number) => void;
  saveGame: (token: string) => Promise<void>;
  setPurchaseMultiplier: (multiplier: PurchaseMultiplier) => void;
}
