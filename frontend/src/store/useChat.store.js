import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.lib";

export const useChatStore = create((set, get) => ({
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

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.data);
      console.log(`message error ${error}`);
    }
  },
}));
