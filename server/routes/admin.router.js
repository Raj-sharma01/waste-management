import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getAllComplaints,createOfficer, getAllOfficers } from '../controllers/admin.controller.js';


const router=express.Router();

router.get('/getAllComplaints',authMiddleware,getAllComplaints)
router.get('/getAllOfficers',authMiddleware, getAllOfficers)
router.post('/createOfficer',authMiddleware,createOfficer)
export default router;