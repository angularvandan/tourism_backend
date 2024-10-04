import S3 from "aws-sdk/clients/s3";
import multer, { Multer } from "multer";
import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload"; // For the S3 upload promise response

// Suppress AWS maintenance mode messages
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// Define multer middleware to handle file uploads
export const upload: Multer = multer({
    storage,
    limits: {
        fileSize: 51006600, // 50MB file size limit
        files: 5, // Maximum number of files allowed
    },
});

interface MulterFile {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
}

// AWS S3 client configuration
const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS as string,
    secretAccessKey: process.env.AWS_SECRET as string,
    region: process.env.AWS_REGION as string,
});

// Function to upload multiple images to S3
export const s3UploadMultiv2 = async (files: MulterFile[]): Promise<ManagedUpload.SendData[]> => {
    const uploads: Promise<ManagedUpload.SendData>[] = [];

    for (const file of files) {
        if (file.mimetype.split("/")[0] === "image") {
            const params: S3.PutObjectRequest = {
                Bucket: process.env.AWS_BUCKET as string,
                Key: `uploads/images/${Date.now().toString()}-${file.originalname}`,
                Body: file.buffer,
            };
            uploads.push(s3.upload(params).promise());
        }
    }

    return Promise.all(uploads); // Return an array of promises for all uploads
};
