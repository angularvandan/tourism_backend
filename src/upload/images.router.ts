import { Router } from "express";
import { uploadImages } from "./images.controller";
import { upload } from "../../utils/aws";

const router = Router();

// Add these handlers to the routes
router.post('/', upload.array("images", 5), uploadImages);

export default router