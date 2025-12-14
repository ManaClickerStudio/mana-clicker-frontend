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

// Typy Mana Surge
export type SurgeType =
  | "GoldenOrb"
  | "ClickFrenzy"
  | "BuildingBoost"
  | "LuckyDrop";

export interface SurgeEffect {
  type: "production_mult" | "click_mult" | "building_mult" | "instant_mana";
  multiplier?: number;
  duration?: number;
  targetRandom?: boolean;
  formula?: string;
}

export interface StaticSurgeType {
  id: SurgeType;
  name: string;
  description: string;
  effect: SurgeEffect;
  timeToClick: number;
  probability: number;
  color: string;
  icon: string;
}

export interface ActiveSurge {
  type: SurgeType;
  expiresAt: number;
}

export interface ActiveBoost {
  type: SurgeType;
  multiplier: number;
  expiresAt: number;
  target?: string;
}

// Typy Talents
export type TalentPath = "hand" | "tower" | "fortune" | "ultimate";

export interface TalentEffect {
  type: string;
  value?: number;
  multiplier?: number;
  duration?: number;
  threshold?: number;
  clicksRequired?: number;
  inactiveMinutes?: number;
  buildingsRequired?: number;
  bonusPercent?: number;
  globalBonus?: number;
  essenceReduction?: number;
}

export interface Talent {
  id: string;
  name: string;
  description: string;
  path: TalentPath;
  tier: number;
  essenceCost: number;
  effect: TalentEffect;
  requires: string[];
}

// Typy Permanent Runes
export interface RuneEffect {
  type: string;
  value: number | boolean;
}

export interface PermanentRune {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: RuneEffect;
  maxLevel: number;
  requiredAscensions?: number;
}

// Typy Automation
export interface AutoClicker {
  unlocked: boolean;
  enabled: boolean;
  level: number;
}

export type AutoBuyerMode = "cheapest" | "mostEfficient" | "targetBuilding";

export interface AutoBuyer {
  unlocked: boolean;
  enabled: boolean;
  mode: AutoBuyerMode;
  targetBuilding: string | null;
  maxSpendPercent: number;
}

// Typy stanu gry
export interface UserBuildings {
  [buildingId: string]: number;
}

export interface GameState {
  // Podstawowe
  mana: number;
  totalManaEarned: number;
  baseManaPerClick: number;
  buildings: UserBuildings;
  upgrades: string[];
  achievements: string[];
  lastUpdate: number;

  // Obliczane
  currentMPS: number;
  currentMPC: number;

  // Ascension / Essence
  currentEssence: number;
  totalEssenceEarned: number;
  ascensionCount: number;

  // Talents
  talents: string[];

  // Permanent Runes (lista ID zakupionych run)
  permanentRunes: string[];

  // Automation
  autoClicker: AutoClicker;
  autoBuyer: AutoBuyer;

  // Active boosts
  activeBoosts: ActiveBoost[];

  // Active surge (waiting to be clicked)
  activeSurge: ActiveSurge | null;

  // Static data (loaded from server)
  staticBuildings: Building[];
  staticUpgrades: Upgrade[];
  staticAchievements: Achievement[];
  staticSurgeTypes: StaticSurgeType[];
  staticTalents: Talent[];
  staticPermanentRunes: PermanentRune[];
}

// Typy zakupów
export type PurchaseMultiplier = 1 | 10 | 25 | 50 | "max";
