import axios from "axios";
import type {
  GameState,
  Building,
  Upgrade,
  Achievement,
  StaticSurgeType,
  Talent,
  PermanentRune,
  AutoBuyer,
} from "@/shared/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/";

const api = axios.create({
  baseURL: API_URL,
});

const getConfig = (token?: string) => {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {};
};

export interface StaticGameData {
  buildings: Building[];
  upgrades: Upgrade[];
  achievements: Achievement[];
  surgeTypes: StaticSurgeType[];
  talents: Talent[];
  permanentRunes: PermanentRune[];
}

// User state type for saving (without static and computed fields)
export type UserGameState = Omit<
  GameState,
  | "staticBuildings"
  | "staticUpgrades"
  | "staticAchievements"
  | "staticSurgeTypes"
  | "staticTalents"
  | "staticPermanentRunes"
  | "currentMPS"
  | "currentMPC"
>;

// Fetches static game data (buildings, upgrades, etc.)
export const getStaticData = async (): Promise<StaticGameData> => {
  const [
    buildingsRes,
    upgradesRes,
    achievementsRes,
    surgeTypesRes,
    talentsRes,
    runesRes,
  ] = await Promise.all([
    axios.get<Building[]>(API_URL + "data/buildings"),
    axios.get<Upgrade[]>(API_URL + "data/upgrades"),
    axios.get<Achievement[]>(API_URL + "data/achievements"),
    axios.get<StaticSurgeType[]>(API_URL + "data/surgeTypes"),
    axios.get<Talent[]>(API_URL + "data/talents"),
    axios.get<PermanentRune[]>(API_URL + "data/permanentRunes"),
  ]);

  return {
    buildings: buildingsRes.data,
    upgrades: upgradesRes.data,
    achievements: achievementsRes.data,
    surgeTypes: surgeTypesRes.data,
    talents: talentsRes.data,
    permanentRunes: runesRes.data,
  };
};

// Loads user game state from server
export const loadGame = async (token: string): Promise<UserGameState> => {
  const response = await api.get<UserGameState>("game/load", getConfig(token));
  return response.data;
};

// Saves user game state to server
export const saveGame = async (
  gameStateToSave: UserGameState,
  token: string
): Promise<void> => {
  await api.post("game/save", gameStateToSave, getConfig(token));
};

export const performAscension = async (
  token: string
): Promise<UserGameState> => {
  const response = await api.post<UserGameState>(
    "game/ascend",
    {},
    getConfig(token)
  );
  return response.data;
};

export const buyTalent = async (
  talentId: string,
  token: string
): Promise<void> => {
  await api.post("game/talent/buy", { talentId }, getConfig(token));
};

export const resetTalents = async (
  token: string
): Promise<{ refundedEssence: number }> => {
  const response = await api.post<{ refundedEssence: number }>(
    "game/talent/reset",
    {},
    getConfig(token)
  );
  return response.data;
};

export const buyRune = async (runeId: string, token: string): Promise<void> => {
  await api.post("game/rune/buy", { runeId }, getConfig(token));
};

export const toggleAutoClicker = async (
  enabled: boolean,
  token: string
): Promise<void> => {
  await api.post("game/autoclicker/toggle", { enabled }, getConfig(token));
};

export const configureAutoBuyer = async (
  config: Partial<AutoBuyer>,
  token: string
): Promise<void> => {
  await api.post("game/autobuyer/configure", config, getConfig(token));
};

export const claimSurge = async (
  surgeType: string,
  token: string
): Promise<{ reward: number }> => {
  const response = await api.post<{ reward: number }>(
    "game/surge/claim",
    { surgeType },
    getConfig(token)
  );
  return response.data;
};

const gameService = {
  getStaticData,
  loadGame,
  saveGame,
  performAscension,
  buyTalent,
  resetTalents,
  buyRune,
  toggleAutoClicker,
  configureAutoBuyer,
  claimSurge,
};

export default gameService;
