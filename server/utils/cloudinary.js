const cloudinary = require('cloudinary').v2;
const fs = require('fs')
require('dotenv').config()

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

exports.uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: process.env.FOLDER_NAME
        })
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log("Error message: ", error);
        fs.unlinkSync(localFilePath)
        return null;
    }
}