// models/chat.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ['text', 'image', 'video'], default: 'text' },
});

const chatSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [messageSchema],
    lastMessage: { type: String },
    lastMessageTime: { type: Date, default: Date.now },
    isGroupChat: { type: Boolean, default: false },
    groupName: { type: String },
    groupImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
