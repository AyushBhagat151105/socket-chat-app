import { v2 as cloudinaryConfig } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinaryConfig.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinaryConfig;
