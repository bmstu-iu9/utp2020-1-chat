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

    User.findOne({login : login}).exec((err,user)=>{
        console.log(user);
        if(user) {
            return res.render("registration.ejs");
        } else {
            let salt = bcryptjs.genSaltSync(10);
            let ava;
            if (gender.toLowerCase().localeCompare("женский") === 0
                || gender.toLowerCase().localeCompare("female") === 0) {
                ava = "/static/media/avatars/female/" + Math.floor(Math.random()*21 + 1) + ".png"
            } else {
                ava = "/static/media/avatars/other/" + Math.floor(Math.random()*4 + 1) + ".png"
            }
            if (gender.toLowerCase().localeCompare("мужской") === 0
                || gender.toLowerCase().localeCompare("male") === 0) {
                ava = "/static/media/avatars/male/" + Math.floor(Math.random()*29 + 1) + ".png"
            }
            const newUser = new User({
                name : name,
                login : login,
                password : bcryptjs.hashSync(password, salt),
                gender: gender,
                avatar: ava
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