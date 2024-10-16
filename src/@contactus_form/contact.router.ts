import express from 'express';
import { createContact, getAllContacts } from './contact.controller';

const router = express.Router();

// POST /api/contact
router.post('/', createContact);

// GET /api/contact (Optional)
router.get('/', getAllContacts);

export default router;
