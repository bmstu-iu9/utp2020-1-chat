const fs = require('fs');
const mongoose = require('mongoose');

let users = [];
function joinUser(socketId, userName, roomName) {
    const user = {
        socketID :  socketId,
        username : userName,
        roomname : roomName
    }
    users.push(user)
    return user;
}

function removeUser(id) {
    const getID = users => users.socketID === id;
    const index =  users.findIndex(getID);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const UserSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    login: {
    type: String,
    required : true,
    },
    password: {
        type: String,
        required: true
    },
});
const User = mongoose.model('User', UserSchema);


module.exports = {
    User,
    joinUser,
    removeUser
};