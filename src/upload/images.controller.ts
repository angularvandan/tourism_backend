import { s3UploadMultiv2 } from "../../utils/aws";

export const uploadImages = async (req: any, res: any) => {
    console.log("Images Upload")
    try {
        if (!req.files || !(req.files instanceof Array)) {
            return res.status(400).json({ message: "No files uploaded." });
        }

        // Cast the files to the expected type
        const files = req.files as Express.Multer.File[];

        // Upload multiple images to S3
        const result = await s3UploadMultiv2(files);

        // Send the URLs or response data of uploaded images
        res.status(201).json({
            message: "Images uploaded successfully",
            data: result.map(file => file.Location), // You get the uploaded file location URL
        });
    } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ message: "Error uploading images", error });
    }
};