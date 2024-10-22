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