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
        const user = removeUser(socket);
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