const Trip = require('../models/Trip');

const createTrip = async (req, res) => {
    const { destinations, people, friends, days, budget, services } = req.body;

    console.log("Received trip data:", req.body); // Log the received data

    if (!req.user || !req.user._id) {
        console.error('User not authenticated');
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const trip = await Trip.create({
            destinations,
            people,
            friends,
            days,
            budget,
            services,
            user: req.user._id  // Associate the trip with the authenticated user
        });
        console.log("Trip saved successfully:", trip); // Log the saved trip
        res.status(201).json(trip);
    } catch (error) {
        console.error('Error saving trip:', error); // Log the error
        res.status(400).json({ error: 'Failed to save trip data' });
    }
};

// Fetch all trips for a user
const getUserTrips = async (req, res) => {
    try {
      const trips = await Trip.find({ user: req.user._id });
      res.status(200).json(trips);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Fetch recent services used by a user
  const getRecentServices = async (req, res) => {
    try {
      const services = await Trip.find({ user: req.user._id })
        .sort({ updatedAt: -1 })
        .limit(5)
        .select('services');
      res.status(200).json(services);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Fetch notifications for a user
  const getUserNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Fetch suggestions
  const getSuggestions = async (req, res) => {
    // Fetch suggestions based on user's past trips, preferences, etc.
    const suggestions = [
      // Mock data
      { name: 'Beautiful Beach', position: { lat: 7.8731, lng: 80.7718 } },
      { name: 'Mountain View', position: { lat: 8.1234, lng: 81.1234 } },
    ];
  
    res.status(200).json(suggestions);
  };

module.exports = { createTrip, getUserTrips, getRecentServices, getUserNotifications, getSuggestions };
