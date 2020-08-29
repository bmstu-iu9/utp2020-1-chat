const mongoose = require('mongoose');
const Room = require('./rooms');

let rooms_users = {};
Room.find({}, function (err, docs) {
    if (err) return console.log(err);
    for (let i = 0;i < docs.length; i++){
        rooms_users[docs[i].name] = { users: {} };
    }
});

let online_users = [];

function userin(socketId, userName, login) {
    const user = {
        socketID :  socketId,
        username : userName,
        login: login
    }
    online_users.push(user);
}

function userout(socketID) {
    let index;
    for (let i = 0; i < online_users.length; i++) {
        if (online_users[i].socketID === socketID) {
            index = i;
            break;
        }
    }
    return online_users.splice(index, 1)[0];
} 

function joinUser(socketId, userName, roomName, login, gender, avatar) {
    const user = {
        socketID :  socketId,
        username : userName,
        roomname : roomName,
        login: login,
        gender: gender
    }
    user_and_login = {
        username: userName,
        login: login,
        gender: gender,
        avatar: avatar
    }
    rooms_users[roomName].users[socketId] = user_and_login;
    return user;
}

function removeUser(socket) {
    room = getUserRooms(socket);
    if (room !== "") {
        let user = rooms_users[room].users[socket.id];
        delete rooms_users[room].users[socket.id];
        //console.log(user);
        //console.log("disconnected");
        return user;
    } else {
        return "";
    }
}

function getUserRooms(socket) {
    return Object.entries(rooms_users).reduce((resname, [name, room]) => {
        if (room.users[socket.id] != null) resname = name;
        return resname;
    }, "")
}

const UserSchema  = new mongoose.Schema({
    name: {
        type: String
    },
    login: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        default: "Мужской"
    },
    avatar: {
        type: String,
        default: Math.floor(Math.random()*29 + 1) + ".png"
    }
});
const User = mongoose.model('User', UserSchema);


module.exports = {
    User,
    joinUser,
    removeUser,
    rooms_users,
    userin,
    userout,
    online_users
};