import asyncHandler from 'express-async-handler'; // Import express-async-handler
import Spot from './spots.model';
import Tour from '../@tours_entity/tours.model'; // Import Tour to validate references

// Get all spots
export const getSpots = asyncHandler(async (req: any, res: any) => {
    const spots = await Spot.find().populate('tour_id'); // Populating tour_id to get tour details
    res.status(200).json(spots);
});

// Get a single spot by ID
export const getSpotById = asyncHandler(async (req: any, res: any) => {
    const spot = await Spot.findById(req.params.id).populate('tour_id');
    if (!spot) {
        res.status(404).json({ message: 'Spot not found' });
    } else {
        res.status(200).json(spot);
    }
});

// Create a new spot
export const createSpot = asyncHandler(async (req: any, res: any) => {
    const { name,tips,images,price_adult,price_child,price_infant,tour_id } = req.body;

    // Additional validation if necessary
    if (!name || !tips || !images || !price_adult || !price_child || !price_infant) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    // Ensure the referenced tour exists
    const tour = await Tour.findById(tour_id);
    if (!tour) {
        res.status(400).json({ message: 'Invalid tour_id, Tour not found' });
    } else {
        const spot = new Spot(req.body);
        const savedSpot = await spot.save();
        res.status(201).json(savedSpot);
    }
});

// Update a spot by ID
export const updateSpot = asyncHandler(async (req: any, res: any) => {
    const { tour_id } = req.body;

    // Ensure the referenced tour exists before updating
    if (tour_id) {
        const tour = await Tour.findById(tour_id);
        if (!tour) {
            res.status(400).json({ message: 'Invalid tour_id, Tour not found' });
            return;
        }
    }

    const updatedSpot = await Spot.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('tour_id');
    if (!updatedSpot) {
        res.status(404).json({ message: 'Spot not found' });
    } else {
        res.status(200).json(updatedSpot);
    }
});

// Delete a spot by ID
export const deleteSpot = asyncHandler(async (req: any, res: any) => {
    const deletedSpot = await Spot.findByIdAndDelete(req.params.id);
    if (!deletedSpot) {
        res.status(404).json({ message: 'Spot not found' });
    } else {
        res.status(200).json({ message:'Spot Deleted Successfully!'});
    }
});
