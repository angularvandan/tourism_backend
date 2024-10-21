import { Request, Response } from 'express';
import axios from "axios";
import generateAccessToken from "../../utils/paypal"

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