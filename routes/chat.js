const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require("../config/ensure.js")

let rooms = {};

router.get('/', ensureAuthenticated, (req, res)=>{
    res.render("main.ejs", {rooms: rooms});
});

router.post('/', (req, res)=>{
    rooms[req.body.room] = {users: {} };
    res.render("main.ejs", {rooms: rooms});
});

router.get('/:chat', ensureAuthenticated, (req, res)=>{
    if (rooms[req.params.chat] == null) {
        res.redirect('back');
    }
    res.render("chat.ejs", {roomname: req.params.chat});
});

router.get('/logout',ensureAuthenticated, (req, res)=>{
    req.logout();
    res.redirect('/');
});

module.exports = router;