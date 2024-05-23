import express from 'express'
import { loginController, profileController, signupController } from '../controllers/auth.controller.js';

const router=express.Router();

router.post('/login',loginController)
router.post('/signup',signupController)
router.get('/profile',profileController)
export default router;


