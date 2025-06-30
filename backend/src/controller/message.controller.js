import { User } from "../model/user.model.js";
import { Message } from "../model/message.model.js";
import cloudinaryConfig from "../lib/cloudinary.lib.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const myID = req.user.id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myID, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myID },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let imageUrl;

    if (image) {
      const uploadRespons = await cloudinaryConfig.uploader.upload(image);
      imageUrl = uploadRespons.secure_url;
    }

    const message = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await message.save();

      //   TODO: realtime update
      
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
