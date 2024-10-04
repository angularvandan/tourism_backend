import {Router} from 'express';
import { createTours, getTours } from './tours.controller';
import { validateTourFields } from './tours.validators';

const router = Router();

router.post('/add-tours',validateTourFields,createTours);
router.get('/getTours',getTours);

export default router;