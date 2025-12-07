// Auth Types
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

// Static Game Data (JSON Files)
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

// Game State Types
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

// Auth Context Types
export interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<AuthResponse>;
  register: (username: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
}

export interface GameContextType {
  state: GameState;
  isGameLoading: boolean;
  error: string | null;
  clickMana: () => void;
  buyBuilding: (buildingId: string) => void;
  buyUpgrade: (upgradeId: string) => void;
  loadGame: (token: string) => Promise<void>;
  incrementMana: (amount: number) => void;
  saveGame: (token: string) => Promise<void>;
}
