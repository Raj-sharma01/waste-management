import mongoose from "mongoose";

const dustbinSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    type:{type:String},
    isFull:false,
});

export const Dustbin = mongoose.model("Dustbin", dustbinSchema);