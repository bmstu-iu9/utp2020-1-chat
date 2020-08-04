const mongoose = require('mongoose');
const Room = require('./rooms');

let rooms_users = {};
Room.find({}, function (err, docs) {
    if (err) return console.log(err);
    for (let i = 0;i < docs.length; i++){
        rooms_users[docs[i].name] = { users: {} };
    }
});

function joinUser(socketId, userName, roomName) {
    const user = {
        socketID :  socketId,
        username : userName,
        roomname : roomName
    }
    rooms_users[roomName].users[socketId] = userName;
    return user;
}

function removeUser(socket) {
    getUserRooms(socket).forEach(room => {
        //console.log(rooms_users[room].users[socket.id]);
        //console.log("disconnected");
        const user = {
            socketID :  socket.id,
            username : rooms_users[room].users[socket.id],
            roomname : room,
        }
        delete rooms_users[room].users[socket.id];
        return user;
    });
}

//Массив - на случай, если сделаем возможность подлючаться к нескольким комнатам
function getUserRooms(socket) {
    return Object.entries(rooms_users).reduce((names, [name, room]) => {
        if (room.users[socket.id] != null) names.push(name)
        return names;
    }, [])
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
});
const User = mongoose.model('User', UserSchema);


module.exports = {
    User,
    joinUser,
    removeUser,
    rooms_users
};