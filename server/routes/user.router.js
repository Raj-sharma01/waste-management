import express from 'express'
import { complaintController, getAllComplaints } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router=express.Router();

router.post('/complaint',authMiddleware,complaintController)
router.get('/getAllComplaints',authMiddleware,getAllComplaints)

export default router;


