import { Router } from 'express';
import { createOrder, getAllPayments, getPaymentById, storePaymentDetails } from './payment.controller';
import { auth } from '../../middleware/auth';

const router = Router();

router.post('/create', createOrder);


router.post('/', storePaymentDetails);
router.get('/', getAllPayments);
// GET /api/payments/:id - Get a specific payment by ID or orderID
router.get('/:id', getPaymentById);

export default router;
