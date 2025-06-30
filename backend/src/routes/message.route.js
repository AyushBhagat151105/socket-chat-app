import express from "express";
import { isAuth } from "../middleware/isAuth.middleware.js";
import {
  getMessages,
  getUserForSidebar,
  sendMessage,
} from "../controller/message.controller.js";

export const messageRoutes = express.Router();

messageRoutes.get("/user", isAuth, getUserForSidebar);
messageRoutes.get("/:id", isAuth, getMessages);

messageRoutes.post("/send", isAuth, sendMessage)