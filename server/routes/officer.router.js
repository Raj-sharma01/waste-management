import express from 'express'
import { createFacility, deleteFacility, getAllComplaints, getAllFacilities, updateComplaint, updateFacility } from '../controllers/officer.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js';

const router=express.Router()

router.get('/getAllComplaints',authMiddleware,getAllComplaints)
router.put('/updateComplaint/:complaintId',authMiddleware, updateComplaint)
router.get('/facilities',authMiddleware, getAllFacilities)
router.post('/facilities',authMiddleware,createFacility)
router.put('/facilities',authMiddleware, updateFacility)
router.delete('/facilities',authMiddleware, deleteFacility)
export default router;
