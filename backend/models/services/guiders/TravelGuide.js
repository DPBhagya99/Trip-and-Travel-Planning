// models/travelGuide.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
});

const travelGuideSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        name: { type: String, required: true },
        lat: Number,
        lng: Number,
    },
    bio: { type: String },
    contact: { type: String },
    rating: { type: Number, default: 0 },
    reviews: [reviewSchema],
    specialties: [{ type: String }],
    pricePerDay: { type: Number, required: true },
    experienceYears: { type: Number },
    languages: [{ type: String }],
    profilePic: { type: String },
    availability: {
        availableDates: [{ type: Date }],
    },
    bookings: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
        totalPrice: Number,
    }],
    earnings: { type: Number, default: 0 },
}, { timestamps: true });

// Custom method to check availability
travelGuideSchema.methods.isAvailable = function (startDate, endDate) {
    return this.bookings.every(booking => {
        return booking.status !== 'confirmed' ||
            (new Date(endDate) < new Date(booking.startDate) || new Date(startDate) > new Date(booking.endDate));
    });
};

module.exports = mongoose.model('TravelGuide', travelGuideSchema);
