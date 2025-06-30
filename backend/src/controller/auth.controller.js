import cloudinaryConfig from "../lib/cloudinary.lib.js";
import { cookie } from "../lib/cookie.lib.js";
import { User } from "../model/user.model.js";

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (password.langth < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const FindUser = await User.findOne({ email });

    if (FindUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({ email, password, name });

    const token = user.generateAuthToken();

    res.status(201).cookie("jwt", token, cookie).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).jsone({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Cradensial does not match" });
    }

    const token = user.generateAuthToken();

    res.status(200).cookie("jwt", token, cookie).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .cookie("jwt", "", { maxAge: 0 })
      .status(200)
      .json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { profileImage } = req.body;

    if (!profileImage) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const uploadRespons = await cloudinaryConfig.uploader.upload(profileImage);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        avatar: uploadRespons.secure_url,
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId, "-password");

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Auth successful", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
