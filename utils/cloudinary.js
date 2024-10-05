import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a file to Cloudinary
const uploadImageOnCloudinary = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderName,
    });
    console.log("Image uploaded successfully", response.url);

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);

    // Remove the locally saved temporary file if the upload operation failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    // Return null in case of error
    return null;
  }
};

export { uploadImageOnCloudinary };
