import { Complaint } from "../models/complaint.model.js";
import { Officer } from "../models/officer.model.js";
import { Facility } from "../models/facility.model.js"

export const getAllComplaints = async (req, res) => {
    try {
        console.log("officer complaints")
        const { userId } = req;
        console.log(userId);

        // Find the officer
        const officer = await Officer.findById(userId).populate('assignedComplaints');
        if (!officer) {
            return res.status(404).json({ message: 'Officer not found', success: false });
        }

        // Get the complaints assigned to the officer
        const complaints = officer.assignedComplaints;
        console.log(complaints);

        res.status(200).json({ message: 'Got all complaints', success: true, complaints: complaints });
    } catch (error) {
        console.log("error in officer complaint")
        console.log("Error in getting all complaints: ", error);
        res.status(500).json({ message: `Error in getting all complaints: ${error.message}`, success: false });
    }
}

export const updateComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { status, remark } = req.body;
        
        // Find the complaint by ID
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found', success: false });
        }

        // Update the complaint fields
        complaint.status = status;
        complaint.remark = remark;

        // Save the updated complaint
        await complaint.save();

        res.status(200).json({ message: 'Complaint updated successfully', success: true, complaint });
    } catch (error) {
        console.log("Error in updating complaint: ", error);
        res.status(500).json({ message: `Error in updating complaint: ${error.message}`, success: false });
    }
};


// Get all facilities
export const getAllFacilities = async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.status(200).json(facilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new facility
export const createFacility = async (req, res) => {
    const { type, latitude, longitude, address, capacity, status } = req.body;
    console.log("createFacility req.body",req.body)
    const newFacility = new Facility({
        type,
        latitude,
        longitude,
        address,
        capacity,
        status
    });

    try {
        const savedFacility = await newFacility.save();
        res.status(201).json(savedFacility);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a facility by ID
export const updateFacility = async (req, res) => {
    const { facilityId } = req.params;
    const { type, latitude, longitude, address, capacity, status } = req.body;

    try {
        const updatedFacility = await Facility.findByIdAndUpdate(
            facilityId,
            { type, latitude, longitude, address, capacity, status },
            { new: true }
        );

        if (!updatedFacility) {
            return res.status(404).json({ message: 'Facility not found' });
        }

        res.status(200).json(updatedFacility);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a facility by ID
export const deleteFacility = async (req, res) => {
    const { facilityId } = req.params;

    try {
        const deletedFacility = await Facility.findByIdAndDelete(facilityId);

        if (!deletedFacility) {
            return res.status(404).json({ message: 'Facility not found' });
        }

        res.status(200).json({ message: 'Facility deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


