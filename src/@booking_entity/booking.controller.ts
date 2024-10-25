import asyncHandler from 'express-async-handler';
import Booking from './booking.model';
import Tour from '../@tours_entity/tours.model'; // Import Tour to validate references

//get all booking
export const getBookings=asyncHandler(async(req:any, res:any)=>{
    const bookings=await Booking.find().sort({ createdAt: -1 });
    if(!bookings){
        res.status(404).json({ message: 'Booking not found' });
    }else{
        res.status(200).json(bookings);
    }
});
// Get a single booking by ID
export const getBookingById = asyncHandler(async (req: any, res: any) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
    } else {
        res.status(200).json(booking);
    }
});

// Create a new booking with inline validation
export const createBooking = asyncHandler(async (req: any, res: any) => {
    const { user_name, user_mobile, user_email, user_address, totalPrice, tours_details, payNow, priceDetails , paymentStatus} = req.body;

    // Validate required fields
    if (
        !user_name ||
        !user_mobile ||
        !user_email ||
        !user_address ||
        !totalPrice ||
        !tours_details ||
        !priceDetails?.adult ||
        !priceDetails?.child ||
        !priceDetails?.infant ||
        typeof payNow !== 'boolean'||
        !paymentStatus

    ) {
        return res.status(400).json({
            message: 'All fields are required: user_name, user_mobile, user_email, user_address, totalPrice, priceDetails (with adult, child, infant details), tours_details,paymentStatus and payNow.'
        });
    }

    // Ensure the referenced tour exists
    const tour = await Tour.findById(tours_details[0]._id);
    if (!tour) {
        return res.status(400).json({ message: 'Tour not found' });
    }

    // Create and save the booking with priceDetails object
    const booking = new Booking({
        user_name,
        user_mobile,
        user_email,
        user_address,
        totalPrice,
        tours_details,
        priceDetails: {
            adult: priceDetails.adult,
            child: priceDetails.child,
            infant: priceDetails.infant
        },
        payNow,
        paymentStatus
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
});
// Update only the paymentStatus of a booking
export const updatePaymentStatus = asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    // Validate the paymentStatus field
    if (paymentStatus !== 'Completed' && paymentStatus !== 'Pending') {
        return res.status(400).json({ message: 'Invalid payment status. It must be either "Completed" or "Pending".' });
    }

    // Find the booking by ID and update paymentStatus
    const booking = await Booking.findByIdAndUpdate(
        id,
        { paymentStatus },
        { new: true } // Return the updated booking
    );

    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
});
