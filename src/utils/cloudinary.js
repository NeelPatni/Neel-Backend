import { v2 as cloudinary } from 'cloudinary';
import fs, { unlinkSync } from 'fs';


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

// Upload an file //

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // Uploaded file on cloudinary //

        const response = await cloudinary.uploader.upload
            (localFilePath, {
                resource_type: 'auto'
            })
        // File has been uploaded successfull //
        console.log("File is uploaded on cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // Remove the locally saved temporary file as the  upload operation got failed

        return null;
    }
}

export { uploadOnCloudinary }
