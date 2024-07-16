import mongoose from "mongoose";

const officerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    assignedComplaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint"
    }],
});

export const Officer = mongoose.model("Officer", officerSchema);