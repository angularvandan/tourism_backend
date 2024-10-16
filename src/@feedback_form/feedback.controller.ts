import asyncHandler from 'express-async-handler';
import Feedback from './feedback.model';

// Create Feedback
export const createFeedback = asyncHandler(async (req: any, res: any) => {
    const { first_name, last_name, email, phone, message } = req.body;

    if (!first_name || !last_name || !email || !phone || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const feedback = new Feedback({
        first_name,
        last_name,
        email,
        phone,
        message,
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
});

// Get all Feedback
export const getAllFeedbacks = asyncHandler(async (req: any, res: any) => {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
});
