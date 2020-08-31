const mongoose = require('mongoose');

const MessageSchema  = new mongoose.Schema({
    roomName: {
        type: String
    },
    text: {
        type: String
    },
    date: {
        type: String,
        default: "" + new Date().getHours() + ":" + new Date().getMinutes(),
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