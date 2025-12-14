import axios from "axios";
import type { GameState, Building, Upgrade, Achievement } from "@/shared/types";

const API_URL = "http://localhost:4000/api/";

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
}

// Pobiera statyczne dane gry (budynki, ulepszenia, osiągnięcia)
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

// Wczytuje stan gry użytkownika z serwera
export const loadGame = async (token: string): Promise<GameState> => {
  const response = await api.get<GameState>("game/load", getConfig(token));
  return response.data;
};

// Zapisuje stan gry użytkownika na serwerze
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
