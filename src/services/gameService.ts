import axios from "axios";
import {
  GameState,
  Building,
  Upgrade,
  Achievement,
} from "../types/game";

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

// Get Static Data (Public)
const getStaticData = async (): Promise<{
  buildings: Building[];
  upgrades: Upgrade[];
  achievements: Achievement[];
}> => {
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

const loadGame = async (token: string): Promise<GameState> => {
  const response = await api.get<GameState>("game/load", getConfig(token));
  return response.data;
};

// Save Game
const saveGame = async (
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
