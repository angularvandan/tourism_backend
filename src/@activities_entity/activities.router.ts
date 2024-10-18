import { Router } from 'express';
import {
    getActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
    getActivitiesBySpotId
} from './activities.controller';

const router = Router();

// Define routes for activities
router.get('/spot/:id', getActivitiesBySpotId);             
router.get('/', getActivities);             
router.get('activity/:id', getActivityById);        
router.post('/', createActivity);           
router.put('/:id', updateActivity);         
router.delete('/:id', deleteActivity);      

export default router;
