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

// Typy statycznych danych gry
export type UpgradeType = "click" | "click_mps" | "global_mps" | "building";

export type AchievementCondition =
  | "totalMana"
  | "currentMPS"
  | "currentMPC"
  | "buildingCount"
  | "targetBuildingCount"
  | "uniqueBuildings"
  | "upgradeCount"
  | "clickCount"
  | "targetBuildingMaxed";

export interface Building {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  baseMps: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  type: UpgradeType;
  bonus: number;
  cost: number;
  requiredCount: number;
  requiredBuilding?: string;
  requiredTotalMana?: number;
  target?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: AchievementCondition;
  value: number;
  targetId?: string;
}

// Typy stanu gry
export interface UserBuildings {
  [buildingId: string]: number;
}

export interface GameState {
  mana: number;
  totalManaEarned: number;
  baseManaPerClick: number;
  buildings: UserBuildings;
  upgrades: string[];
  achievements: string[];
  staticBuildings: Building[];
  staticUpgrades: Upgrade[];
  staticAchievements: Achievement[];
  currentMPS: number;
  currentMPC: number;
  lastUpdate: number;
}

// Typy zakupów
export type PurchaseMultiplier = 1 | 10 | 25 | 50 | "max";
