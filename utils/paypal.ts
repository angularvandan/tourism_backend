import axios from "axios";
import qs from "qs";

const { PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY, PAYPAL_BASE_URL, PAYPAL_WEBHOOK_ID } = process.env;

const base = PAYPAL_BASE_URL;

console.log("PAYPAL: ", PAYPAL_BASE_URL, PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY,)

export const paypalWebhook = async (req: any, res: any) => {
    const body = req.body;
    const headers = req.headers;

    // Extract the required PayPal headers for validation
    const transmissionId = headers["paypal-transmission-id"];
    const transmissionTime = headers["paypal-transmission-time"];
    const certUrl = headers["paypal-cert-url"];
    const authAlgo = headers["paypal-auth-algo"];
    const transmissionSig = headers["paypal-transmission-sig"];
    const webhookId = PAYPAL_WEBHOOK_ID;  // You need to store this PayPal Webhook ID in your environment variables.

    // Generate the Webhook Event Signature Verification URL
    const verifyUrl = `${PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`;

    // Request payload to verify the webhook signature
    const payload = {
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: webhookId,
        webhook_event: body
    };

    try {
        // Step 1: Verify the webhook signature
        const { data: verificationResult } = await axios.post(verifyUrl, payload, {
            auth: {
                username: PAYPAL_CLIENT_KEY!,
                password: PAYPAL_SECRET_KEY!
            }
        });

        if (verificationResult.verification_status !== "SUCCESS") {
            console.error("Webhook verification failed");
            return res.status(400).send({ success: false, message: "Invalid webhook signature" });
        }

        // Step 2: Handle the event
        const eventType = body.event_type;
        console.log("Webhook event received:", eventType);

        switch (eventType) {
            case "CHECKOUT.ORDER.APPROVED":
                const orderId = body.resource.id;
                console.log("Order Approved:", orderId);

                // Step 3: Capture the payment if the order is approved
                const captureUrl = `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`;
                const { data: captureResponse } = await axios.post(
                    captureUrl,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${await generateAccessToken()}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                console.log("Payment captured:", captureResponse);
                res.status(200).send({
                    success: true,
                    message: "Payment captured successfully",
                    data: captureResponse
                });
                break;

            default:
                console.log("Unhandled event type:", eventType);
                res.status(200).send({ success: true, message: "Webhook received" });
        }
    } catch (error: any) {
        console.error("Webhook processing failed:", error.message);
        res.status(500).send({ success: false, message: "Webhook processing failed" });
    }
};

const generateAccessToken = async () => {
    const auth = Buffer.from(PAYPAL_CLIENT_KEY + ":" + PAYPAL_SECRET_KEY).toString("base64");
    const url = `${base}/v1/oauth2/token`;
    const axiosInfo = { grant_type: "client_credentials" };
    try {
        const { data } = await axios.post(url, qs.stringify(axiosInfo), {
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded' // Ensure the content type is correct
            },
        });

        return data.access_token;
    } catch (error: any) {
        console.log("Failed to generate Access Token", error.response.data);
    }
};

export default generateAccessToken;