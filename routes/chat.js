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

let rooms = [];

Room.find({}, function (err, docs) {
    if (err) return console.log(err);
    for (let i = 0;i < docs.length; i++){
        rooms.push(docs[i].name);
    }
});

router.get('/', ensureAuthenticated, (req, res)=>{
    res.render("main.ejs", {rooms: rooms});
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
    Room.findOne({name : req.params.chat}).exec((err,room)=> {
        if (room) {
            res.render("chat.ejs", {roomname: req.params.chat, user: req.user, roomusers: rooms_users});
            console.log("users in room:")
            console.log(rooms_users);
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