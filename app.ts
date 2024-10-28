import express from 'express';
import cors from 'cors';
import dbConnect from './src/config/db';
import { activityRouter, bannerRouter, blogRouter, bookingRouter, contactRouter, feedbackRouter, paymentRouter, privacyPolicyRouter, spotsRouter, toursRouter, uploadRouter, userRouter } from './src';
import { paypalWebhook } from './utils/paypal';

dbConnect();
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);

app.use('/api/tours', toursRouter);
app.use('/api/spots', spotsRouter);
app.use('/api/activities', activityRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/spots', spotsRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/user', userRouter);

app.use('/api/feedback', feedbackRouter)
app.use('/api/contact', contactRouter)
app.use('/api/banner', bannerRouter)

app.use('/api/upload', uploadRouter);
app.use('/api/payment', paymentRouter);

app.use('/api/privacy-policy',privacyPolicyRouter);

app.post("/webhook/paypal", paypalWebhook);


export default app;