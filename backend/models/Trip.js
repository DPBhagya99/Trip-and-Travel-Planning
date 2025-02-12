const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destinations: [{ name: String, position: { lat: Number, lng: Number } }],
  people: { type: Number, required: true },
  friends: [{ type: String }],  // Store friend emails
  days: { type: Number, required: true },
  budget: { type: String, enum: ['cheap', 'moderate', 'luxury'], required: true },
  services: [String], // Optional services the user might select
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
