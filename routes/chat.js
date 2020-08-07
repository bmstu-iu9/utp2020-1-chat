const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require("../config/ensure.js");
const bodyParser = require ('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const Room = require('../models/rooms');
const {
    User,
    joinUser,
    removeUser,
    rooms_users
} = require('../models/user');
const Message = require('../models/messages');

let rooms = [];

Room.find({}, function (err, docs) {
    if (err) return console.log(err);
    for (let i = 0;i < docs.length; i++){
        rooms.push(docs[i].name);
    }
});

router.get('/', ensureAuthenticated, (req, res)=>{
    let all_users = [];

    User.find({}, function (err, docs) {
        if (err) return console.log(err);
        for (let i = 0;i < docs.length; i++){
            let user = {
                name: docs[i].name,
                login: docs[i].login
            }
            all_users.push(user);
        }
    });
    res.render("main.ejs", {rooms: rooms, all_users: all_users});
});

router.post('/', (req, res)=>{
    const newroom = new Room({
        name : req.body.room,
    });
    newroom.save(function(err){
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            rooms_users[req.body.room] = { users: {} };
            rooms.push(newroom.name);
            res.render("main.ejs", {rooms: rooms});
        }
    });
});

router.get('/:chat', ensureAuthenticated, (req, res)=>{
    let messages = [];
    Message.find({roomName: req.params.chat}, function (err, docs) {
        if (err) return console.log(err);
        for (let i = 0;i < docs.length; i++){
            let message = {
                roomName: docs[i].roomName,
                text: docs[i].text,
                date: docs[i].date,
                login: docs[i].login,
                username: docs[i].username
            }
            messages.push(message);
        }
    });
    Room.findOne({name : req.params.chat}).exec((err,room)=> {
        if (room) {
            res.render("chat.ejs", {roomname: req.params.chat, user: req.user, roomusers: rooms_users, data_messages: messages});
            console.log("users in room " + req.params.chat + ": ");
            console.log(rooms_users[req.params.chat]);
        } else {
            res.redirect("back");
        }
    });
});

router.get('/logout',ensureAuthenticated, (req, res)=>{
    req.logout();
    res.redirect('/');
});

module.exports = router;