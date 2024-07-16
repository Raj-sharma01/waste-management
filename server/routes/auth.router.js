import express from 'express'
import { loginController, profileController, signupController, login, logout } from '../controllers/auth.controller.js';

const router=express.Router();

// router.post('/login',loginController)
router.post('/login',login)
router.post('/signup',signupController)
router.get('/profile',profileController)
router.get('/logout',logout)

export default router;


