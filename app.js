const express = require('path');
const router = express.Router();
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

const path = require('path');
const session = require('express-session');
const fs = require('fs');
const {
    User,
    joinUser,
    removeUser
} = require('./models/user');

app.use('/', require('./routes/auth'));
app.use('/main', require('./routes/chat'));
app.use('/registration', require('./routes/registration'));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on("join room", (data) =>{
        console.log('in room');
        let newUser = joinUser(socket.id, data.username, data.roomname);
        socket.emit('send data', {id: socket.id, username: newUser.username, roomname: newUser.roomname});
        console.log(newUser);
        socket.join(newUser.roomname);
    });

    socket.on("chat message", (data) => {
        io.to(data.room).emit("chat message", {data:data, id: socket.id});
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        console.log(user);
        if (user){
            console.log(user.username + ' has left');
        }
        console.log("disconnected");
    });
});

http.listen(3000, function () {
    console.log('Server is listening on port 3000');
});