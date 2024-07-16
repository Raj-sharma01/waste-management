import { Complaint } from "../models/complaint.model.js";
import { User } from "../models/user.model.js";
import { Officer } from "../models/officer.model.js";
import bcrypt from 'bcrypt'
import {Event} from '../models/event.model.js'
import { Facility } from "../models/facility.model.js";

export const assignComplaint = async (req, res) => {
    try {
        const { userId } = req;
        const { complaintId } = req.params;
        const { officerId } = req.body;
        // console.log("req.body",req.body)
        // console.log("complaintId",complaintId)
        // Validate officerId and complaintId
        if (!officerId || !complaintId) {
            return res.status(400).json({ message: 'Officer ID or Complaint ID is missing', success: false });
        }

        // Check if the complaint exists
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found', success: false });
        }
        console.log("complaint",complaint);

        // Check if the officer exists
        const officer = await Officer.findById(officerId);
        if (!officer) {
            return res.status(404).json({ message: 'Officer not found', success: false });
        }
        console.log("officer",officer)

        // Assign the complaint to the officer
        complaint.assignedTo = officerId;
        await complaint.save();
        console.log("complaint",complaint);

        // Add the complaint to the officer's assignedComplaints
        officer.assignedComplaints.push(complaintId);
        await officer.save();
        console.log("officer",officer)

        return res.status(200).json({ message: 'Complaint assigned successfully', success: true });
    } catch (error) {
        console.log("Error in assigning complaint: ", error);
        res.status(500).json({ message: `Error in assigning complaint: ${error.message}`, success: false });
    }
};


export const getAllComplaints = async (req, res) => {
    try {
        const { userId } = req;
        console.log(userId)
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const complaints = await Complaint.find().populate('assignedTo').sort({ createdAt: -1 });
        complaints.map(complaint => complaint.assignedTo ? console.log(complaint) : null)
        // console.log(complaints)
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
        // console.log(officers)
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
        // console.log("user ", user)
        if (!user) {
            return res.status(200).json({ message: 'User not found', success: false });
        }
        const bcryptSalt = bcrypt.genSaltSync(10);
        // console.log(bcryptSalt)
        const hashedPassword = bcrypt.hashSync(req.body.password, bcryptSalt)
        // console.log("hash = ", hashedPassword)
        const officer = await Officer.create({
            username: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        // console.log("officer = ",officer)
        return res.status(200).json({ message: "Officer Created", success: true });
    } catch (error) {
        console.log("Error in creating Officer: ", error);
        res.status(500).json({ message: `Error in creating Officer: ${error.message}`, success: false });
    }
}

export const createEvent = async (req, res) => {
    try {
        const { title, start, end, backgroundColor, venue, url } = req.body;

        // Validate required fields
        if (!title || !start || !end) {
            return res.status(400).json({ message: 'Title, start and end time are required', success: false });
        }

        const event = await Event.create({
            title,
            start,
            end,
            backgroundColor,
            venue,
            url
        });

        return res.status(200).json({ message: "Event Created", success: true, event });
    } catch (error) {
        console.log("Error in creating Event: ", error);
        res.status(500).json({ message: `Error in creating Event: ${error.message}`, success: false });
    }
};

//stats--

export const getUserStats = async (req, res) => {
  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    const userCount = await User.countDocuments({ role: 'user' });
    console.log("adminCount",adminCount);
    console.log("userCount",userCount);

    res.json({ userDistribution: { adminCount, userCount } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getFacilityStats = async (req, res) => {
  try {
    const activeCount = await Facility.countDocuments({ status: 'Active' });
    const inactiveCount = await Facility.countDocuments({ status: 'Inactive' });

    const facilities = await Facility.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    const types = facilities.map(facility => facility._id);
    const counts = facilities.map(facility => facility.count);

    res.json({ 
      facilityStatus: { activeCount, inactiveCount },
      facilityDistribution: { types, counts }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getComplaintStats = async (req, res) => {
  try {
    const pending = await Complaint.countDocuments({ status: 'Pending' });
    const inProgress = await Complaint.countDocuments({ status: 'In Progress' });
    const resolved = await Complaint.countDocuments({ status: 'Resolved' });
    const rejected = await Complaint.countDocuments({ status: 'Rejected' });

    const monthlyComplaints = await Complaint.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    const labels = monthlyComplaints.map(item => new Date(0, item._id - 1).toLocaleString('default', { month: 'long' }));
    const counts = monthlyComplaints.map(item => item.count);

    res.json({ 
      complaintStatus: { pending, inProgress, resolved, rejected },
      monthlyComplaints: { labels, counts }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getEventStats = async (req, res) => {
  try {
    const events = await Event.aggregate([
      {
        $group: {
          _id: { $month: "$start" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    const labels = events.map(item => new Date(0, item._id - 1).toLocaleString('default', { month: 'long' }));
    const counts = events.map(item => item.count);

    res.json({ eventsOverTime: { labels, counts } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
