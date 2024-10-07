import { Router } from 'express';
import {
    getActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
} from './activities.controller';

const router = Router();

// Define routes for activities
router.get('/', getActivities);             
router.get('/:id', getActivityById);        
router.post('/', createActivity);           
router.put('/:id', updateActivity);         
router.delete('/:id', deleteActivity);      

export default router;
