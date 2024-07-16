import express from 'express'
import { complaintController, getAllComplaints, getAllEvents, getAllFacilities } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router=express.Router();

router.post('/complaint',authMiddleware,complaintController)
router.get('/getAllComplaints',authMiddleware,getAllComplaints)
router.get('/getAllEvents',getAllEvents)
router.get('/facilities',getAllFacilities)
export default router;


