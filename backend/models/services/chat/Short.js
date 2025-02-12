const mongoose = require('mongoose');

const shortSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Short', shortSchema);
