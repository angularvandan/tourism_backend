import asyncHandler from 'express-async-handler';
import Activity from './activities.model';
import Spot from '../@spots_entity/spots.model'; // Import Spot to validate references

// Get all activities
export const getActivities = asyncHandler(async (req: any, res: any) => {
    const { id } = req.params; 
    const activities = await Activity.find({spot_id:id}).populate('spot_id'); 
    res.status(200).json(activities);
});
// Get all activities
export const getActivitiesBySpotId = asyncHandler(async (req: any, res: any) => {
    const { id } = req.params; 
    const activities = await Activity.find({spot_id:id}).populate('spot_id'); 
    res.status(200).json(activities);
});
// Get a single activity by ID
export const getActivityById = asyncHandler(async (req: any, res: any) => {
    const activity = await Activity.findById(req.params.id).populate('spot_id');
    if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(activity);
});

// Create a new activity
export const createActivity = asyncHandler(async (req: any, res: any) => {
    const { name, description, price_adult, price_child, price_infant, image, spot_id } = req.body;

    // Validate required fields
    if (!name || !description || !price_adult || !price_child || !price_infant || !image || !spot_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    // Ensure the referenced spot exists
    const spot = await Spot.findById(spot_id);
    if (!spot) {
        return res.status(400).json({ message: 'Invalid spot_id, Spot not found' });
    }

    const activity = new Activity(req.body);
    const savedActivity = await activity.save();
    res.status(201).json(savedActivity);
});

// Update an activity by ID
export const updateActivity = asyncHandler(async (req: any, res: any) => {

    const { name, description, price_adult, price_child, price_infant, image, spot_id } = req.body;

    // Validate required fields
    if (!name || !description || !price_adult || !price_child || !price_infant || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    // Ensure the referenced spot exists before updating
    if (spot_id) {
        const spot = await Spot.findById(spot_id);
        if (!spot) {
            return res.status(400).json({ message: 'Invalid spot_id, Spot not found' });
        }
    }

    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('spot_id');
    if (!updatedActivity) {
        return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(updatedActivity);
});

// Delete an activity by ID
export const deleteActivity = asyncHandler(async (req: any, res: any) => {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) {
        return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(204).json();
});
