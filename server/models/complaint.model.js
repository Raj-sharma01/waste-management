import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true},
    complainerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "In Progress", "Resolved", "Rejected"],
        default: "Pending",
    },
    remark: {
        type: String,
        default: "",
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
    }
}, {
    timestamps: true,
});

export const Complaint = mongoose.model("Complaint", complaintSchema);