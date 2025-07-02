import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isChecking: true,
  isSigningUp: false,
  isLogingIn: false,
  isUpdataingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data });
    } catch (error) {
      set({ authUser: null });
      console.log("error in checkAuth", error);
    } finally {
      set({ isChecking: false });
    }
  },

  signUp: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in signUp", error);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
