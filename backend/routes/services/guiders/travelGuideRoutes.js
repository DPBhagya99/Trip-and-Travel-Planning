// routes/services/guiders/travelGuideRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TravelGuide = require('../../../models/services/guiders/TravelGuide');
const Booking = require('../../../models/services/guiders/Booking');
const auth = require('../../../middlewares/requireAuth');

// Fetch travel guides based on location and filters
router.post('/guides/search', auth, async (req, res) => {
    const { lat, lng, maxDistance = 20, minRating, priceRange, languages } = req.body;

    try {
        const latRange = maxDistance / 111; // Approx 1 degree latitude = 111 km
        const lngRange = maxDistance / (111 * Math.cos(lat * (Math.PI / 180)));

        let filters = {
            'location.lat': { $gte: lat - latRange, $lte: lat + latRange },
            'location.lng': { $gte: lng - lngRange, $lte: lng + lngRange },
        };

        if (minRating) filters.rating = { $gte: minRating };
        if (priceRange) filters.pricePerDay = { $gte: priceRange[0], $lte: priceRange[1] };
        if (languages && languages.length > 0) filters.languages = { $in: languages };

        const guides = await TravelGuide.find(filters);
        res.status(200).json(guides);
    } catch (error) {
        console.error('Error fetching travel guides:', error);
        res.status(500).json({ error: 'Failed to fetch travel guides' });
    }
});

// Get a single guide by ID
router.get('/travel-guides/:id', async (req, res) => {
    try {
        const guideId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(guideId)) {
            return res.status(400).json({ error: 'Invalid Guide ID' });
        }

        const guide = await TravelGuide.findById(guideId).populate('reviews.user', 'firstName lastName');
        if (!guide) return res.status(404).json({ error: 'Guide not found' });

        res.status(200).json(guide);
    } catch (error) {
        console.error('Error fetching guide:', error);
        res.status(500).json({ error: 'Failed to fetch guide' });
    }
});

// Book a guide
router.post('/travel-guides/:id/book', auth, async (req, res) => {
    const { startDate, endDate, transactionId, totalPrice } = req.body;
    const guideId = req.params.id;
    const userId = req.user._id;

    try {
        if (!mongoose.Types.ObjectId.isValid(guideId)) {
            return res.status(400).json({ error: 'Invalid Guide ID' });
        }

        const guide = await TravelGuide.findById(guideId);
        if (!guide) return res.status(404).json({ error: 'Guide not found' });

        const isAvailable = guide.availability.availableDates.some(date =>
            new Date(date) >= new Date(startDate) && new Date(date) <= new Date(endDate)
        );

        if (!isAvailable) {
            return res.status(400).json({ error: 'The guide is not available on the selected dates' });
        }

        const calculatedPrice = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) * guide.pricePerDay;
        if (calculatedPrice !== totalPrice) {
            return res.status(400).json({ error: 'Total price does not match calculated price' });
        }

        const booking = new Booking({
            userId,
            guideId,
            startDate,
            endDate,
            totalPrice,
            transactionId,
            status: 'confirmed',
        });

        guide.bookings.push({
            userId,
            startDate,
            endDate,
            status: 'confirmed',
            totalPrice,
        });

        guide.availability.availableDates = guide.availability.availableDates.filter(date =>
            new Date(date) < new Date(startDate) || new Date(date) > new Date(endDate)
        );

        await booking.save();
        await guide.save();

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error('Error booking guide:', error);
        res.status(500).json({ error: 'Failed to book guide' });
    }
});

// Add review
router.post('/travel-guides/:id/review', auth, async (req, res) => {
    const { review, rating } = req.body;
    const guideId = req.params.id;
    const userId = req.user._id;

    try {
        if (!mongoose.Types.ObjectId.isValid(guideId)) {
            return res.status(400).json({ error: 'Invalid Guide ID' });
        }

        const guide = await TravelGuide.findById(guideId);
        if (!guide) return res.status(404).json({ error: 'Guide not found' });

        guide.reviews.push({ user: userId, review, rating });
        guide.rating = (guide.rating * (guide.reviews.length - 1) + rating) / guide.reviews.length;
        await guide.save();

        res.json({ message: 'Review added successfully' });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

module.exports = router;
