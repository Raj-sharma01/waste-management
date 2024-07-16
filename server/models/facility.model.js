import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Red Bin', 'Green Bin', 'Blue Bin', 'Recycling Center', 'Composting Facility', 'Hazardous Waste Collection Point', 'Medical Waste Disposal Facility', 'Waste Transfer Station', 'Landfill Site'],
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  // Other relevant fields such as operational hours, contact information, etc.
}, { timestamps: true });

export const Facility = mongoose.model('Facility', facilitySchema);

