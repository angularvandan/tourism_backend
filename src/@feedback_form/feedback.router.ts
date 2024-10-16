import express from 'express';
import { createFeedback, getAllFeedbacks } from './feedback.controller';

const router = express.Router();

// Route to create feedback
router.post('/', createFeedback);

// Route to get all feedbacks
router.get('/', getAllFeedbacks);

export default router;
