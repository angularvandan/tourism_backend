import { Router } from 'express';
import { createOrder } from './payment.controller';

const router = Router();

router.post('/create', createOrder);

export default router;
