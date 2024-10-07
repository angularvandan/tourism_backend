import { Router } from 'express';
import { createTour, deleteTour, getAllTours, getTourById, updateTour } from './tours.controller';
import { auth, isAdmin } from '../../middleware/auth';

const router = Router();

// Add these handlers to the routes
router.post('/', auth, isAdmin, createTour);
router.get('/', getAllTours);
router.get('/:id', getTourById);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);

export default router