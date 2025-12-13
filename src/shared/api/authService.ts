import axios from "axios";
import type { AuthResponse } from "@/entities/game";

const API_URL = "http://localhost:4000/api/auth/";

// Register Function
const register = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(API_URL + "register", {
    username,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login Function
const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(API_URL + "login", {
    username,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout Function
const logout = (): void => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
