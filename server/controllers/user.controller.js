import { Complaint } from "../models/complaint.model.js";
import { User } from "../models/user.model.js";
import { Event } from "../models/event.model.js";
import { Facility } from "../models/facility.model.js";

export const complaintController = async (req, res) => {
    try {
        const { userId, body } = req;
        console.log(userId)
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        console.log(body)
        // Create a new complaint
        const newComplaint = new Complaint({
            address: body.address,
            latitude: body.latitude,
            longitude: body.longitude,
            complainerId: userId,
            description: body.complaint,
        });

        // Save the complaint
        await newComplaint.save();

        res.status(201).json({ message: 'Complaint saved successfully', success: true });

    } catch (error) {
        console.log("Error in saving complaint: ", error);
        res.status(500).json({ message: `Error in saving complaint: ${error.message}`, success: false });
    }
}


export  const getAllComplaints = async (req,res)=>{
    try {
        const { userId } = req;
        console.log(userId)
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
       
       const complaints=await Complaint.find({complainerId : userId}).sort({ createdAt: -1 });
        console.log(complaints)
        res.status(201).json({ message: 'Got all complaints', success: true, complaints: complaints });

    } catch (error) {
        console.log("Error in getting all complaints: ", error);
        res.status(500).json({ message: `Error in getting all complaints: ${error.message}`, success: false });
    }
}

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        // console.log(officers)
        res.status(201).json({ message: 'Got all events', success: true, events: events });

    } catch (error) {
        console.log("Error in getting all events: ", error);
        res.status(500).json({ message: `Error in getting all events: ${error.message}`, success: false });
    }
}

// Get all facilities
export const getAllFacilities = async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.status(200).json(facilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};