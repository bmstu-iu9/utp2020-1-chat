const express = require('express');
const router = express.Router();
const bodyParser = require ('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/registration', (req, res)=>{
    res.render("registration.ejs");
});

router.post('/register', (req, res) =>{
    let username = req.body.username;
    let login = req.body.login;
    let password = req.body.password;
    let user = new user(username, login, password);
    if (!user.check()){
        user.save();
        res.redirect('main.ejs');
    } else {
        res.redirect('back');
    }
});

module.exports = router;