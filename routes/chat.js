const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require("../config/ensure.js");
const bodyParser = require ('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const Room = require('../models/rooms');

let rooms = [];

Room.find({}, function (err, docs) {
    if (err) return console.log(err);
    for (let i = 0;i < docs.length; i++){
        rooms.push(docs[i].name);
        console.log(docs[i].name);
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
            rooms.push(newroom.name);
            res.render("main.ejs", {rooms: rooms});
        }
    });
});

router.get('/:chat', ensureAuthenticated, (req, res)=>{
    Room.findOne({chat : req.params.chat}).exec((err,room)=> {
        if (room) {
            res.render("chat.ejs", {roomname: req.params.chat, user: req.user});
        } else {
            res.render("back");
        }
    });
});

router.get('/logout',ensureAuthenticated, (req, res)=>{
    req.logout();
    res.redirect('/');
});

module.exports = router;