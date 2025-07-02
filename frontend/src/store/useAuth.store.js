import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isChecking: true,
  isSigningUp: false,
  isLogingIn: false,
  isUpdataingProfile: false,
  isLoggingOut: false,

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
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLogingIn: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("error in login", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isLogingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true });
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("error in logout", error);
      toast.error("Failed to logout");
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
