import { Complaint } from "../models/complaint.model.js";
import { User } from "../models/user.model.js";

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

/**
 

export const complaintStatusController= async (req,res)=>{
    try {
        const { userId } = req;

        // Find the user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Populate complaints associated with the user
        await user.populate('complaints');

        // Extract complaint data
        const complaintStatuses = user.complaints

        // Send the complaint statuses as a response
        res.status(200).json({ complaintStatuses, success: true });
        
    } catch (error) {
        console.log("Error in getting complaints status : ", error);
        res.status(500).json({ message: Error in getting complaints status: ${error.message}, success: false });
    }
}

 **/