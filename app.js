const app = require('express')();
const http = require("http").createServer(app);
const io = require('socket.io')(http);

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('router');
const fs = require('fs');
const {
    User,
    joinUser,
    removeUser,
} = require('./models/user');


const urlencodedParser = bodyParser.urlencoded({extended: false});

const checkLogin_pass = function(login, password) {
    let data = fs.readFileSync("./data/users.json", 'utf-8');
    let users = JSON.parse(data);
    for (let i = 0 ; i < users.length; i++) {
        if (login === users[i].login && password === users[i].password) return true
    }
    return false;
};

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/pages/html/login.html");
});

app.post('/', urlencodedParser, function (req, res) {
    let login = req.body.login;
    let password = req.body.password;
    if (checkLogin_pass(login, password)) {
        res.redirect('/pages/html/main.html');
    } else {
        res.redirect('back');
    }
});

app.get('/registration', function (req, res) {
    res.sendFile(__dirname + "/pages/html/registration.html");
});

app.post('/registration', function (req, res) {
    let username = req.body.username;
    let login = req.body.login;
    let password = req.body.password;
    let user = new User(username, login, password);
    if (!user.check()) {
        user.save();
        res.redirect('/pages/html/chat.html');
    } else {
        res.redirect('back');
    }
});

let thisRoom = "";
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on("join room", (data) =>{
        console.log('in room');
        let newUser = joinUser(socket.id, data.userName, data.roomName);
        socket.emit('send data', {id: socket.id, username: newUser.username, roomname: newUser.roomname});
        thisRoom = newUser.roomname;
        console.log(newUser);
        socket.join(newUser.roomname);
    });

    socket.on("chat message", (data) => {
       io.to(thisRoom).emit("chat message", {data:data, id: socket.id});
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