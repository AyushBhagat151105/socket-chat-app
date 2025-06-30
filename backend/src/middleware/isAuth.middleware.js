import { User } from "../model/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = await User.checkAuthToken(token);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // console.log(decoded);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
