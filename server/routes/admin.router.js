import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getAllComplaints,createOfficer, getAllOfficers, assignComplaint, createEvent, getUserStats, getFacilityStats, getComplaintStats, getEventStats } from '../controllers/admin.controller.js';


const router=express.Router();

router.get('/getAllComplaints',authMiddleware,getAllComplaints)
router.get('/getAllOfficers',authMiddleware, getAllOfficers)
router.post('/createOfficer',authMiddleware,createOfficer)
router.post('/assignComplaint/:complaintId', authMiddleware, assignComplaint);
router.post('/createEvent',authMiddleware, createEvent )

//stats
router.get('/users/stats',authMiddleware,getUserStats)
router.get('/facilities/stats',authMiddleware,getFacilityStats)
router.get('/complaints/stats',authMiddleware,getComplaintStats)
router.get('/events/stats',authMiddleware,getEventStats)
export default router;