import { Request, Response } from 'express';
import axios from "axios";
import generateAccessToken from "../../utils/paypal";
import asyncHandler from 'express-async-handler';
import { Payment } from './payment.model';
import Booking from '../@booking_entity/booking.model';

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
                        currency_code: 'USD',
                        value: amount // Replace with dynamic value
                    }
                }
            ]
        };

        const response = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', orderData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
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


export const storePaymentDetails = asyncHandler(async (req: any, res: any) => {
    const { orderID, bookingId, amount, paymentStatus, payerID } = req.body;

    if (!orderID || !bookingId || !amount || !paymentStatus) {
        res.status(400).json({ message: 'Missing required payment details' });
    }
    // Find the booking by bookingId
    const booking = await Booking.findById(bookingId);

    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    // If payment is successfully done, update the paymentStatus in the Booking model
    if (paymentStatus === 'Completed') {
        booking.paymentStatus = 'Completed';  // Assuming the booking model has a paymentStatus field
        await booking.save();  // Save the updated booking
    }

    const payment = new Payment({
        orderID,
        bookingId,
        amount,
        paymentStatus,
        payerID,
    });

    const savedPayment = await payment.save();

    res.status(201).json({
        message: 'Payment processed and booking updated',
        payment: savedPayment,
        booking
    });
});

export const getAllPayments = asyncHandler(async (req: Request, res: Response) => {
    const payments = await Payment.find({});
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
