import express from 'express';
import passport from 'passport';
import { register, login, current } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', passport.authenticate('jwt', { session: false }), current);

export default router;
