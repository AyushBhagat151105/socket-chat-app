import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.lib";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  usUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/message/user");
      set({ users: response.data });
    } catch (error) {
      toast.error("Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (id) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/message/${id}`);
      set({ messages: response.data });
    } catch (error) {
      toast.error("Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  // TODO: optimize this later
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
