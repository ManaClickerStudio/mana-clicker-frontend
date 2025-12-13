import axios from "axios";
import type { GameState, Building, Upgrade, Achievement } from "@/shared/types";

const API_URL = "http://localhost:4000/api/";

// Create Axios Instance
const api = axios.create({
  baseURL: API_URL,
});

// Helper to get headers with token
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
}

/**
 * Fetches static game data (buildings, upgrades, achievements)
 */
export const getStaticData = async (): Promise<StaticGameData> => {
  const [buildingsRes, upgradesRes, achievementsRes] = await Promise.all([
    axios.get<Building[]>(API_URL + "data/buildings"),
    axios.get<Upgrade[]>(API_URL + "data/upgrades"),
    axios.get<Achievement[]>(API_URL + "data/achievements"),
  ]);

  return {
    buildings: buildingsRes.data,
    upgrades: upgradesRes.data,
    achievements: achievementsRes.data,
  };
};

/**
 * Loads user's game state from the server
 */
export const loadGame = async (token: string): Promise<GameState> => {
  const response = await api.get<GameState>("game/load", getConfig(token));
  return response.data;
};

/**
 * Saves user's game state to the server
 */
export const saveGame = async (
  gameStateToSave: Omit<
    GameState,
    | "staticBuildings"
    | "staticUpgrades"
    | "staticAchievements"
    | "currentMPS"
    | "currentMPC"
  >,
  token: string
): Promise<void> => {
  await api.post("game/save", gameStateToSave, getConfig(token));
};

const gameService = {
  getStaticData,
  loadGame,
  saveGame,
};

export default gameService;
