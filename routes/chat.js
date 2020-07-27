const express = require('express');
const router = express.Router();

let rooms = {};

router.get('/', (req, res)=>{
    res.render("main.ejs", {rooms: rooms});
});

router.post('/', (req, res)=>{
    rooms[req.body.room] = {users: {} };
    res.render("main.ejs", {rooms: rooms});
});

router.get('/:chat', (req, res)=>{
    if (rooms[req.params.chat] == null) {
        res.redirect('back');
    }
    res.render("chat.ejs", {roomname: req.params.chat});
});

router.get('/logout', (req, res)=>{
});

module.exports = router;