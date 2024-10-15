import asyncHandler from 'express-async-handler';
import Booking from './booking.model';
import Tour from '../@tours_entity/tours.model'; // Import Tour to validate references


// Get a single booking by ID
export const getBookingById = asyncHandler(async (req: any, res: any) => {
    const booking = await Booking.findById(req.params.id).populate('tours_id');
    if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
    } else {
        res.status(200).json(booking);
    }
});

// Create a new booking with inline validation
export const createBooking = asyncHandler(async (req: any, res: any) => {
    const { user_name, user_mobile, user_email, user_address, totalPrice, tours_details, payNow } = req.body;

    // Validate required fields
    if (
        !user_name ||
        !user_mobile ||
        !user_email ||
        !user_address ||
        !totalPrice ||
        !tours_details ||
        typeof payNow !== 'boolean'
    ) {
        return res.status(400).json({
            message: 'All fields are required: user_name, user_mobile, user_email, user_address, totalPrice, tours_details, and payNow.'
        });
    }

    // Ensure the referenced tour exists
    const tour = await Tour.findById(user_email);
    if (!tour) {
        return res.status(400).json({ message: 'Invalid email, Tour not found' });
    }

    // Create and save the booking
    const booking = new Booking({
        user_name,
        user_mobile,
        user_email,
        user_address,
        totalPrice,
        tours_details,
        payNow
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
});
