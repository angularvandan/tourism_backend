import { Router } from 'express';
import {
    getBookingById,
    createBooking,
} from './booking.controller';

const router = Router();

// Define routes for bookings
router.get('/:id', getBookingById);
router.post('/', createBooking);        

export default router;
