import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (file, folder) => {
    try {
        if (!fs.existsSync(file)) return null;
        const result = await cloudinary.uploader.upload(file, {
            folder: folder,
            resource_type:"auto"
        });
        console.log("file is uploaded successfully", result.url)
        return result;
    } catch (error) {
        fs.unlinkSync(file)// remove the locally saved temporary file because operation got failed
        console.log(error);
        return null;
    }
}

export {uploadOnCloudinary};