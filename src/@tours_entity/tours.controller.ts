import asyncHandler from 'express-async-handler'
import Tour from './tours.model'

export const createTours = asyncHandler(async (req: any, res: any) => {
    const tour = new Tour(req.body);
    try {
        const savedTour = await tour.save();
        res.status(201).json(savedTour);
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
});

export const getTours = asyncHandler( async(req: any, res: any) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});
