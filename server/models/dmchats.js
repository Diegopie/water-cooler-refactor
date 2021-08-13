const mongoose = require('mongoose');

const DMSchema = new mongoose.Schema({
    message: {
        type: String,
        required: 'Message is required'
    },
    userID: {
        type: String,
        required: 'userID is required'
    },
    socketRoomId: {
        type: 'String'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

const DMChat = mongoose.model('DMChat', DMSchema);

module.exports = DMChat;
