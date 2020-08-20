const express = require('express');
const router = express.Router();
const bodyParser = require ('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const mongoose = require('mongoose');
const passport = require('passport');
const bcryptjs = require('bcryptjs');

const {
    User,
    joinUser,
    removeUser,
    rooms_users,
    userin,
    userout,
    online_users
} = require('../models/user');

router.get('/', (req, res)=>{
    res.render("registration.ejs");
});

router.post('/', (req, res) =>{
    const {name, login, password, gender} = req.body;
    console.log('The registration of user with ' + 'Name: ' + name + ' login: ' + login+ ' pass: ' + password + ' gender: ' + gender);
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
            var salt = bcryptjs.genSaltSync(10);
            const newUser = new User({
                name : name,
                login : login,
                password : bcryptjs.hashSync(password, salt)
            });
            newUser.save(function(err){
                if (err) {
                    console.log(err);
                    return res.redirect("back");
                }
                else {
                    passport.authenticate('local',{
                        successRedirect : '/',
                        failureRedirect : '/login'
                    })(req,res);
                }
            });
        }
    });
});

module.exports = router;