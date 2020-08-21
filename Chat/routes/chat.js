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
    rooms_users,
    userin,
    userout,
    online_users
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
    var all_users = [];

    User.find({}, function (err, docs) {
        if (err) return console.log(err);
        for (let i = 0;i < docs.length; i++){
            let user = {
                name: docs[i].name,
                login: docs[i].login,
                gender: docs[i].gender
            }
            all_users.push(user);
            if (i === docs.length-1){
                res.render("menu.ejs", {rooms: rooms, all_users: all_users, user: req.user, online_users: online_users});
            }
        }
    });
});
 
async function saveRoom_and_getMainpage(req, res){
    let all_users = await User.find({}, function (err, docs) {
        if (err) return console.log(err);
        let users = []
        for (let i = 0;i < docs.length; i++){
            let user = {
                name: docs[i].name,
                login: docs[i].login,
                gender: docs[i].gender
            }
            users.push(user);
        }
        return users;
    });
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
            res.render("menu.ejs", {rooms: rooms, all_users: all_users, user: req.user, online_users: online_users});
        }
    });
}
 
router.post('/', (req, res)=>{
    saveRoom_and_getMainpage(req,res);
});
 
async function getRoom(req, res){
    let messages = await Message.find({roomName: req.params.chat}, function (err, docs) {
        if (err) return console.log(err);
        let db_messages = [];
        for (let i = 0;i < docs.length; i++){
            let message = {
                roomName: docs[i].roomName,
                text: docs[i].text,
                date: docs[i].date,
                login: docs[i].login,
                username: docs[i].username
            }
            db_messages.push(message);
        }
        return db_messages;
    });
    Room.findOne({name : req.params.chat}).exec((err,room)=> {
        if (room) {
            res.render("chat.ejs", {roomname: req.params.chat, user: req.user, roomusers: rooms_users[req.params.chat], data_messages: messages});
            console.log("users in " + req.params.chat + ": ");
            console.log(rooms_users[req.params.chat]);
        } else {
            res.redirect("back");
        }
    });
}
 
router.get('/:chat', ensureAuthenticated, (req, res)=>{
    getRoom(req, res);
});
 
router.post('/logout',ensureAuthenticated, (req, res)=>{
    req.logout();
    res.redirect('/login');
});
 
module.exports = router;