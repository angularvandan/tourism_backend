import express from 'express';
import cors from 'cors';
import dbConnect from './src/config/db';
import { toursRouter } from './src';

dbConnect();
const app=express();
app.use(express.json());

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);

app.use('/api/tours', toursRouter);


export default app;