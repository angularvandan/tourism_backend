import express from 'express';
import cors from 'cors';
import dbConnect from './src/config/db';
import {  activityRouter, blogRouter, spotsRouter, toursRouter, uploadRouter, userRouter } from './src';

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
app.use('/api/spots',spotsRouter);
app.use('/api/activities',activityRouter);
app.use('/api/blogs',blogRouter);
app.use('/api/spots', spotsRouter);
app.use('/api/user', userRouter);

app.use('/api/upload', uploadRouter);


export default app;