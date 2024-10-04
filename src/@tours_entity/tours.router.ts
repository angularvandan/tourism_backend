import { Router } from 'express';
import { createTour, deleteTour, getAllTours, getTourById, updateTour } from './tours.controller';

const router = Router();

// Add these handlers to the routes
router.post('/', createTour);
router.get('/', getAllTours);
router.get('/:id', getTourById);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);

export default router