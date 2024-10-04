import Tour from './tours.model';
import { Request, Response } from 'express';
import ErrorHandler from '../../utils/errorHandler'

// CREATE Tour
export const createTour = async (req: any, res: any) => {
    try {
        const { name, title, description, address, images, tips, price_adult, price_child, price_infant } = req.body;

        // Additional validation if necessary
        if (!name || !title || !description || !address || !images || !tips || !price_adult || !price_child || !price_infant) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newTour = new Tour({ name, title, description, address, images, tips, price_adult, price_child, price_infant });
        const savedTour = await newTour.save();
        res.status(201).json({ success: true, savedTour });
    } catch (error) {
        res.status(400).json({ message: 'Error creating tour', error });
    }
};

// READ (Get all Tours)
export const getAllTours = async (req: any, res: any, next: any) => {
    try {
        const tours = await Tour.find();
        res.status(200).json({ success: true, tours });
    } catch (error) {
        return next(new ErrorHandler("Error getting tours", 501))
    }
};

// READ (Get Tour by ID)
export const getTourById = async (req: Request, res: Response) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (tour) {
            res.status(200).json(tour);
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tour', error });
    }
};

// UPDATE Tour
export const updateTour = async (req: Request, res: Response) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedTour) {
            res.status(200).json(updatedTour);
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating tour', error });
    }
};

// DELETE Tour
export const deleteTour = async (req: Request, res: Response) => {
    try {
        const deletedTour = await Tour.findByIdAndDelete(req.params.id);
        if (deletedTour) {
            res.status(200).json({ message: 'Tour deleted successfully' });
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tour', error });
    }
};