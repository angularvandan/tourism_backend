import { Router } from 'express';
import {
    getBookingById,
    createBooking,
    getBookings,
    updatePaymentStatus,
} from './booking.controller';

const router = Router();

// Define routes for bookings
router.get('/:id', getBookingById);
router.get('/', getBookings);
router.post('/', createBooking);        
router.patch('/:id', updatePaymentStatus);        

export default router;
