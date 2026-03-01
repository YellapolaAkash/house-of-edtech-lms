import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { loginUser } from "../services/auth.service";
import apiClient from "../api/apiClient";

interface AuthState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  // ✅ LOGIN
  login: async (username: string, password: string) => {
    const response = await loginUser({ username, password });

    const token = response.data.accessToken;

    await SecureStore.setItemAsync("token", token);

    set({
      token,
      isAuthenticated: true,
    });
  },

  // ✅ LOGOUT
  logout: async () => {
    await SecureStore.deleteItemAsync("token");

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  // ✅ AUTO LOGIN CHECK (IMPORTANT FOR REQUIREMENT)
  checkAuth: async () => {
    const storedToken = await SecureStore.getItemAsync("token");

    if (!storedToken) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      const response = await apiClient.get("/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      set({
        token: storedToken,
        user: response.data,
        isAuthenticated: true,
      });
    } catch (error) {
      await SecureStore.deleteItemAsync("token");
      set({
        token: null,
        user: null,
        isAuthenticated: false,
      });
    }
  },
}));