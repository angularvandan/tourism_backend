// privacyPolicyAPI/privacyPolicyRouter.ts

import express from 'express';
import { createPrivacyPolicy, deletePrivacyPolicy, getPrivacyPolicy, updatePrivacyPolicy } from './privacy.controller';

const router = express.Router();

router.post('/', createPrivacyPolicy);    
router.get('/', getPrivacyPolicy);      // Get current privacy policy
router.put('/:id', updatePrivacyPolicy);    // Update privacy policy
router.delete('/:id', deletePrivacyPolicy);    // Update privacy policy

export default router;
