import mongoose from "mongoose";

const recycleCentreSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    typeAccepted: { type: String },
    capacity: { type: Number },  // in kg
    currentLoad: { type: Number }   // in kg
});

export const RecycleCentre = mongoose.model("RecycleCentre", recycleCentreSchema);