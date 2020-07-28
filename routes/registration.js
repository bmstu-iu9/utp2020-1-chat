const express = require('express');
const router = express.Router();
const bodyParser = require ('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const User = require('../models/user');

router.get('/registration', (req, res)=>{
    res.render("registration.ejs");
});

router.post('/registration', (req, res) =>{
    const {name, login, password} = req.body;
    console.log(' Name ' + name+ ' login :' + login+ ' pass:' + password);
    if(!name || !login || !password) {
        res.render("registration.ejs");
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        res.render("registration.ejs");
    }

    //validation passed
    User.findOne({login : login}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            res.render("registration.ejs");
        } else {
            const newUser = new User({
                name : name,
                login : login,
                password : password
            });
            newUser.save(function(err){
                if (err) {
                    console.log(err);
                    res.redirect("back");
                }
                else {
                    res.redirect('/main');
                }
            });
        }
    });
});

module.exports = router;