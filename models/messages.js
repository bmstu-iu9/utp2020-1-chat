const mongoose = require('mongoose');

const MessageSchema  = new mongoose.Schema({
    roomName: {
        type: String
    },
    text: {
        type: String
    },
    date: {
        type: Date,
        default: new Date(),
    },
    login: {
        type: String
    },
    username: {
        type: String
    }
});

const Message = mongoose.model('Message', MessageSchema);


module.exports = Message;