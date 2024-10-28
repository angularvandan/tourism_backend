// privacyPolicyAPI/privacyPolicyController.ts

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import PrivacyPolicy, { IPrivacyPolicy } from './privacy.model';

// Get Privacy Policy
export const getPrivacyPolicy = asyncHandler(async (req: Request, res: Response) => {
    const policy: IPrivacyPolicy[] | null = await PrivacyPolicy.find().sort({ updatedAt: -1 });
    if (!policy) {
        res.status(404).json({ message: 'Privacy Policy not found' });
    } else {
        res.json(policy);
    }
});

// Create Privacy Policy
export const createPrivacyPolicy = asyncHandler(async (req: Request, res: Response) => {
    const { privacyContent } = req.body;

    if (!privacyContent) {
        res.status(400).json({ message: 'Content is required' });
        return;
    }

    const newPolicy = new PrivacyPolicy({ privacyContent });
    const createdPolicy = await newPolicy.save();
    res.status(201).json(createdPolicy);
});

// Update Privacy Policy by ID
export const updatePrivacyPolicy = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { privacyContent } = req.body;

    // Find and update the policy by ID
    const policy = await PrivacyPolicy.findById(id);

    if (policy) {
        policy.privacyContent = privacyContent;
        const updatedPolicy = await policy.save();
        res.json(updatedPolicy);
    } else {
        res.status(404).json({ message: 'Privacy Policy not found' });
    }
});
// Delete Privacy Policy by ID
export const deletePrivacyPolicy = asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
  
    const policy = await PrivacyPolicy.findByIdAndDelete(id);
  
    if (!policy) {
      return res.status(404).json({ message: 'Privacy Policy not found' });
    }
  
    res.status(200).json({ message: 'Privacy Policy deleted successfully' });
  });
