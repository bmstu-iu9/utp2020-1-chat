const express = require('express');
const router = express.Router();
const bodyParser = require ('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const mongoose = require('mongoose');
const passport = require('passport');

const {
    User,
    joinUser,
    removeUser,
    rooms_users
} = require('../models/user');

router.get('/', (req, res)=>{
    res.render("registration.ejs");
});

router.post('/', (req, res) =>{
    const {name, login, password} = req.body;
    console.log(' Name ' + name+ ' login :' + login+ ' pass:' + password);
    if(!name || !login || !password) {
        return res.render("registration.ejs");
    }

    if (password.length < 6) {
        return res.render("registration.ejs");
    }
    User.findOne({login : login}).exec((err,user)=>{
        console.log(user);
        if(user) {
            return res.render("registration.ejs");
        } else {
            const newUser = new User({
                name : name,
                login : login,
                password : password
            });
            newUser.save(function(err){
                if (err) {
                    console.log(err);
                    return res.redirect("back");
                }
                else {
                    passport.authenticate('local',{
                        successRedirect : '/main',
                        failureRedirect : '/'
                    })(req,res);
                }
            });
        }
    });
});

module.exports = router;