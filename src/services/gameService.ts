import axios from "axios";
import {
  GameState,
  Building,
  Upgrade,
  Achievement,
  AuthResponse,
} from "../types/game";

const API_URL = "http://localhost:4000/api/";

// Create Axios Instance
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor - Add JWT Token to Requests
api.interceptors.request.use(
  (config) => {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      const user: AuthResponse = JSON.parse(userJSON);
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get Static Data
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

const loadGame = async (): Promise<GameState> => {
  const response = await api.get<GameState>("game/load");
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
  >
): Promise<void> => {
  await api.post("game/save", gameStateToSave);
};

const gameService = {
  getStaticData,
  loadGame,
  saveGame,
};

export default gameService;
