import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // 🔥 Yeh API_SECRET hona chahiye
});

  



export const uploadMediaToCloudinary = async (filePath) => {
    try {

        const result = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });

        return result;
    } catch (error) {
        console.error("❌ Cloudinary Upload Error:", error);
        return null;
    }
};


export const deleteMediaToCloudinary = async (publicId) => {
    try {

        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error("Cloudinary Delete Error:", error.message);
        return null;
    }
};
