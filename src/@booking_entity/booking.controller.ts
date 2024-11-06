import asyncHandler from 'express-async-handler';
import Booking from './booking.model';
import Tour from '../@tours_entity/tours.model'; // Import Tour to validate references
import { sendEmail } from '../../utils/email';

//get all booking
export const getBookings = asyncHandler(async (req: any, res: any) => {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    if (!bookings) {
        res.status(404).json({ message: 'Booking not found' });
    } else {
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
    const { user_name, user_mobile, user_email, user_address, totalPrice, tours_details, payNow, priceDetails, paymentStatus } = req.body;

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
        typeof payNow !== 'boolean' ||
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


    // Prepare email details

    const subject = `Payment Status: ${paymentStatus}`;
    const text = `Booking ID: ${booking._id}\nAmount: ${totalPrice}\nPayment Status: ${paymentStatus}\n`;
    //for  start and end date of tour
    const dateObj1 = new Date(tours_details[0].startDate);
    const dateObj2 = new Date(tours_details[0].endDate);

    const formattedStartDate = dateObj1.toLocaleDateString('en-GB'); // Adjust the locale as needed
    const formattedEndDate = dateObj2.toLocaleDateString('en-GB'); // Adjust the locale as needed


    let html = `
        <h1 >Payment Status: ${paymentStatus}</h1>
        <p><strong>Booking ID:</strong> ${booking._id}</p>
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Mobile:</strong> ${user_mobile}</p>
        <p><strong>Amount:</strong> ${totalPrice}</p>
        <p><strong>Tour Details:</strong> <br>
            <p style="margin-left:20px"><strong>Name:</strong> ${tours_details[0].name}</p>
            <p style="margin-left:20px"><strong>Address:</strong> ${tours_details[0].address}</p>
            <p style="margin-left:20px"><strong>Start Dete:</strong> ${formattedStartDate}</p>
            <p style="margin-left:20px"><strong>End Date:</strong> ${formattedEndDate}</p>
        </p>
    `;
    for (let i = 1; i < tours_details.length; i++) {

        // Convert the date and time strings to Date objects
        const dateObj = new Date(tours_details[i].date);
        const timeObj = new Date(tours_details[i].time);

        // Format the date and time separately
        const formattedDate = dateObj.toLocaleDateString('en-GB'); // Adjust the locale as needed
        const formattedTime = timeObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        html +=
            `<p><strong>Spot Details:</strong> <br>
            <p style="margin-left:20px"><strong>Name:</strong> ${tours_details[i].spot_id.name}</p>
        </p>
        <p><strong>Activity Details:</strong> <br>
            <p style="margin-left:20px"><strong>Name:</strong> ${tours_details[i].name}</p>
            <p style="margin-left:20px"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin-left:20px"><strong>Time:</strong> ${formattedTime}</p>
        </p>`
    }
    html += `<p><strong>Payment Status:</strong> ${paymentStatus}</p>`;

    // Send email
    await sendEmail(booking.user_email, subject, text, html); // Assuming you have customer's email in booking

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
