import { Request, Response } from 'express';
import axios from "axios";
import generateAccessToken from "../../utils/paypal";
import asyncHandler from 'express-async-handler';
import { Payment } from './payment.model';
import Booking from '../@booking_entity/booking.model';
import { sendEmail } from '../../utils/email';

// Create PayPal payment
export const createOrder = async (req: Request, res: Response) => {
    const { amount } = req.body; // Get amount from request body

    try {
        const accessToken = await generateAccessToken();

        const orderData = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'NZD',
                        value: amount // Replace with dynamic value
                    }
                }
            ],
            // payment_source: {
            //     card: {
            //         name: "Yash",
            //         number: "2223000048400011",
            //         security_code: "111",
            //         expiry: "2025-09",
            //         billing_address: {
            //             address_line_1: "test",
            //             address_line_2: "test",
            //             admin_area_1: "test",
            //             admin_area_2: "test",
            //             postal_code: "2222",
            //             country_code: "NZ",
            //         }
            //     }
            // },
        };

        const response = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', orderData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        const order = response.data;

        // Send the order ID to the frontend
        res.status(200).json({ orderID: order.id });
    } catch (error: any) {
        console.error('Error creating PayPal order:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error creating PayPal order', error: error.response?.data || error.message });
    }
};


export const storePaymentDetails = asyncHandler(async (req:any, res:any) => {
    const { orderID, bookingId, amount, paymentStatus, payerID, errorMessage, errorDetails } = req.body;

    // Check for required fields
    if (!orderID || !bookingId || !amount || !paymentStatus) {
        return res.status(400).json({ message: 'Missing required payment details' });
    }

    // Find the booking by bookingId
    const booking = await Booking.findById(bookingId);

    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the booking payment status based on the payment status
    if (paymentStatus.toLowerCase() === 'completed') {
        booking.paymentStatus = 'Completed'; // Assuming the booking model has a paymentStatus field
    } else {
        booking.paymentStatus = 'Pending'; // Change to 'Failed' or another status as necessary
    }
    
    // Save the updated booking
    await booking.save();

    // Create a new payment object
    const payment = new Payment({
        orderID,
        bookingId,
        amount,
        paymentStatus,
        payerID,
        errorMessage: paymentStatus.toLowerCase() === 'completed' ? undefined : errorMessage,
        errorDetails: paymentStatus.toLowerCase() === 'completed' ? undefined : errorDetails,
    });

    // Save the payment details
    const savedPayment = await payment.save();

    // Prepare email details
    const subject = `Payment Status: ${paymentStatus}`;
    const text = `Booking ID: ${bookingId}\nAmount: ${amount}\nPayment Status: ${paymentStatus}\nPayer ID: ${payerID}`;
    const html = `
        <h1>Payment Status: ${paymentStatus}</h1>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Payment Status:</strong> ${paymentStatus}</p>
        <p><strong>Payer ID:</strong> ${payerID}</p>
    `;

    // Send email
    await sendEmail(booking.user_email, subject, text, html); // Assuming you have customer's email in booking



    // Send response
    res.status(201).json({
        message: 'Payment processed and booking updated',
        payment: savedPayment,
        booking,
    });
});

export const getAllPayments = asyncHandler(async (req: Request, res: Response) => {
    const payments = await Payment.find({}).sort({ paymentDate: -1 }).populate('bookingId');
    if (payments.length === 0) {
        res.status(404).json({ message: 'No payment details found' });
    } else {
        res.json(payments);
    }
});

export const getPaymentById = asyncHandler(async (req: Request, res: Response) => {
    const payment = await Payment.findOne({ _id: req.params.id });

    if (payment) {
        res.json(payment);
    } else {
        res.status(404).json({ message: 'Payment not found' });
    }
});
