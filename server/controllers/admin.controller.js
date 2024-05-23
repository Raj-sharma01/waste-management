import { Complaint } from "../models/complaint.model.js";
import { User } from "../models/user.model.js";
import { Officer } from "../models/officer.model.js";

export const getAllComplaints = async (req, res) => {
    try {
        const { userId } = req;
        console.log(userId)
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const complaints = await Complaint.find().sort({ createdAt: -1 });
        console.log(complaints)
        res.status(201).json({ message: 'Got all complaints', success: true, complaints: complaints });

    } catch (error) {
        console.log("Error in getting all complaints: ", error);
        res.status(500).json({ message: `Error in getting all complaints: ${error.message}`, success: false });
    }
}

export const getAllOfficers = async (req, res) => {
    try {
        const { userId } = req;
        console.log(userId)
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const officers = await Officer.find().sort({ createdAt: -1 });
        console.log(officers)
        res.status(201).json({ message: 'Got all officers', success: true, officers: officers });

    } catch (error) {
        console.log("Error in getting all officers: ", error);
        res.status(500).json({ message: `Error in getting all officers: ${error.message}`, success: false });
    }
}

export const createOfficer = async (req, res) => {
    try {

        const { userId } = req;
        console.log("userId", userId)
        // Find the user
        const user = await User.findById(userId);
        if (user) {
            return res.status(200).json({ message: 'User not found', success: false });
        }

        const officer = await Officer.create({ name: req.body.name, email: req.body.email, password: req.body.password })
        console.log(officer)
        return res.status(200).json({message: "Officer Created", success:true});
    } catch (error) {
        console.log("Error in creating Officer: ", error);
        res.status(500).json({ message: `Error in creating Officer: ${error.message}`, success: false });
    }
}