import { Router } from 'express';
import { createOrder } from './payment.controller';

const router = Router();

router.get('/create', createOrder);

export default router;
