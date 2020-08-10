const express = require('express');
const router = express.Router();
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const passport = require('passport');
const fs = require('fs');
const {
    User,
    joinUser,
    removeUser,
    rooms_users
} = require('./models/user');
const Room = require('./models/rooms');
const Message = require('./models/messages');
 
app.use('/static', express.static(__dirname + '/public'));
app.set('views', __dirname + '/pages');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
 
const session = require('express-session');
 
require("./config/passport")(passport);
 
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));
 
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
 
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', require('./routes/auth'));
app.use('/registration', require('./routes/registration'));
app.use('/', require('./routes/chat'));
 
let online_users = [];
 
io.on('connection', (socket) => {
 
    socket.on("logged in", (data) =>{
        let user = {
            name: data.user,
            login: data.login
        }
        online_users.push(user);
        console.log(user.login + " connected");
        socket.emit("new online", {online_users: online_users});
    });
 
    socket.on("join room", (data) =>{
        //console.log('User connected');
        console.log('in room');
        let newUser = joinUser(socket.id, data.username, data.roomname);
        socket.emit('send data', {id: socket.id, username: newUser.username, roomname: newUser.roomname});
        console.log(newUser);
        socket.join(newUser.roomname);
    });
 
    socket.on("chat message", (data) => {
        const message = new Message({
            username : data.user,
            login : data.login,
            roomName: data.room,
            text: data.value,
        });
        message.save();
        io.to(data.room).emit("chat message", {data:data, id: socket.id});
    });

    socket.on("disconnect", () => {
        removeUser(socket);
        socket.emit("user-disconnected");
    });

    socket.on("user-disconnected", (data) => {
        let login = data.login;
        let index;
        for (let i = 0; i < online_users.length; i++) {
            if (online_users[i].login === login) {
                index = i;
                break;
            }
        }
        online_users.splice(index, 1);
        console.log(login + " disconnected");
    });
});
 
http.listen(3000, function () {
    console.log('Server is listening on port 3000');
});