import { Router } from 'express';
import {
    getBookingById,
    createBooking,
    getBookings,
} from './booking.controller';

const router = Router();

// Define routes for bookings
router.get('/:id', getBookingById);
router.get('/', getBookings);
router.post('/', createBooking);        

export default router;
