// privacyPolicyAPI/privacyPolicyController.ts

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import PrivacyPolicy, { IPrivacyPolicy } from './privacy.model';

// Get Privacy Policy
export const getPrivacyPolicy = asyncHandler(async (req: Request, res: Response) => {
    const policy: IPrivacyPolicy | null = await PrivacyPolicy.findOne().sort({ updatedAt: -1 });
    if (!policy) {
        res.status(404).json({ message: 'Privacy Policy not found' });
    } else {
        res.json(policy);
    }
});

// Create Privacy Policy
export const createPrivacyPolicy = asyncHandler(async (req: Request, res: Response) => {
    const { content } = req.body;

    if (!content) {
        res.status(400).json({ message: 'Content is required' });
        return;
    }

    const newPolicy = new PrivacyPolicy({ content });
    const createdPolicy = await newPolicy.save();
    res.status(201).json(createdPolicy);
});

// Update Privacy Policy
export const updatePrivacyPolicy = asyncHandler(async (req: Request, res: Response) => {
    const { content } = req.body;
    let policy = await PrivacyPolicy.findOne();
    
    if (policy) {
        policy.content = content;
    } else {
        policy = new PrivacyPolicy({ content });
    }

    const updatedPolicy = await policy.save();
    res.json(updatedPolicy);
});
