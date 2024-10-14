import { Router } from 'express';
import { createSpot, deleteSpot, getSpotById, getSpots, getSpotsByTourId, updateSpot } from './spots.controller';

const router = Router();

router.post('/', createSpot);
router.get('/', getSpots);
router.get('/:id', getSpotsByTourId);
router.get('/spot/:id', getSpotById);
router.put('/:id', updateSpot);
router.delete('/:id', deleteSpot);

export default router;