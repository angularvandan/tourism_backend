import {Router} from 'express';
import { createTours, getTours } from './tours.controller';

const router = Router();

router.post('/add-tours',createTours);
router.get('/getTours',getTours);

export default router;