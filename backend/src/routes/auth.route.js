import express from "express";
import {
    checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { isAuth } from "../middleware/isAuth.middleware.js";

export const authRoutes = express.Router();

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

authRoutes.put("/update-profile", isAuth, updateProfile);

authRoutes.get("/check", isAuth, checkAuth);
