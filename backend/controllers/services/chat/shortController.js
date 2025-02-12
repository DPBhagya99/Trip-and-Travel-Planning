const Short = require('../../../models/services/chat/Short');

// Get all shorts
exports.getShorts = async (req, res) => {
    try {
        const shorts = await Short.find({});
        res.status(200).json(shorts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching shorts' });
    }
};

// Add a new short
exports.addShort = async (req, res) => {
    try {
        const { content, image } = req.body;
        const userId = req.user._id;
        const newShort = new Short({ content, image, userId });
        await newShort.save();
        res.status(201).json(newShort);
    } catch (error) {
        res.status(500).json({ error: 'Error adding short' });
    }
};
