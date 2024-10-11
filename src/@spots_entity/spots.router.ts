import { Router } from 'express';
import { createSpot, deleteSpot, getSpotById, getSpots, updateSpot } from './spots.controller';

const router = Router();

router.post('/', createSpot);
router.get('/:id', getSpots);
router.get('/:id', getSpotById);
router.put('/:id', updateSpot);
router.delete('/:id', deleteSpot);

export default router;