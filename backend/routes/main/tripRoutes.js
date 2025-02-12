const express = require('express');
const { createTrip, getUserTrips, getRecentServices, getUserNotifications, getSuggestions } = require('../../controllers/tripController');
const auth = require('../../middlewares/requireAuth');
const router = express.Router();

router.get('/trips', auth, getUserTrips);

router.post('/trips', auth, createTrip);

router.get('/services/recent', auth, getRecentServices);
router.get('/notifications', auth, getUserNotifications);
router.get('/suggestions', auth, getSuggestions);


router.get('/trip/places', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Google API responded with status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data); // Send the response back to the client
        console.log(data);
    } catch (error) {
        console.error('Error fetching place details:', error.message);
        res.status(500).json({ error: 'Failed to fetch place details' });
    }
});

router.post('/trip/directions/best_route', async (req, res) => {
    try {
        const { origin, destinations } = req.body;

        // Construct the waypoints parameter
        const waypoints = destinations.slice(0, -1).join('|'); // Exclude the last destination
        const destination = destinations[destinations.length - 1]; // Final destination

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error('Error fetching directions:', error);
        res.status(500).json({ error: 'Failed to fetch directions' });
    }
});

module.exports = router;


