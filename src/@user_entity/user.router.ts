import { Router } from 'express';
import { getUsers, login, register } from './user.controller';
import { auth } from '../../middleware/auth';

const router = Router()

router.post('/register', register);
router.post('/login',login);
router.get('/',auth,getUsers);

export default router