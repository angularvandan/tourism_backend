import Tour from './tours.model';
import { Request, Response } from 'express';
import ErrorHandler from '../../utils/errorHandler'
import Spot from '../@spots_entity/spots.model';
import Activity from '../@activities_entity/activities.model';

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
        const tourId = req.params.id;

        const deletedTour = await Tour.findByIdAndDelete(tourId);
        if (deletedTour) {

            // Find and delete all spots related to the tour
            const spots = await Spot.find({ tour_id: tourId });
            const spotIds = spots.map(spot => spot._id);

            // Delete all spots and their associated activities
            await Promise.all([
                Spot.deleteMany({ tour_id: tourId }),
                Activity.deleteMany({ spot_id: { $in: spotIds } })
            ]);

            res.status(200).json({ message: 'Tour, spots, and activities deleted successfully' });
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tour', error });
    }
};