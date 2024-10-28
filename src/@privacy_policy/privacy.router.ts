// privacyPolicyAPI/privacyPolicyRouter.ts

import express from 'express';
import { createPrivacyPolicy, getPrivacyPolicy, updatePrivacyPolicy } from './privacy.controller';

const router = express.Router();

router.post('/', createPrivacyPolicy);    
router.get('/', getPrivacyPolicy);      // Get current privacy policy
router.put('/', updatePrivacyPolicy);    // Update privacy policy

export default router;
