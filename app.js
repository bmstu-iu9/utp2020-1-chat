const app = require('express')();
const http = require("http").createServer(app);
const io = require('socket.io')(http);

const path = require('path');
const User = require('./models/user')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('router');
const fs = require('fs');

const checkLogin_pass = function(login, password){
    let data = fs.readFileSync("../data/users.json", 'utf-8');
    let users = JSON.parse(data);
    for(let i=0;i<users.length;i++){
        if (login === users[i].login && password === users[i].password) return true
    }
    return false;
};

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/pages/html/login.html");
});

app.post('/', function (req, res) {
    let login = req.body.login;
    let password = req.body.password;
    if (checkLogin_pass(login, password)){
        res.redirect('/pages/html/main.html');
    } else {
        alert("Неправильный логин или пароль");
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
    if (!user.check()){
        user.save();
        res.redirect('/pages/html/chat.html');
    } else {
        alert("Данный логин уже занят");
        res.redirect('back');
    }
});

http.listen(3000, function () {
    console.log('Server is listening on port 3000');
});