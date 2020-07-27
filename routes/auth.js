const express = require('express');
const router = express.Router();
const bodyParser = require ('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res)=>{
    res.render("login.ejs");
});

router.post('/', (req, res, next)=>{
    let login = req.body.login;
    let password = req.body.password;
    if (checkLogin_pass(login, password)) {
        res.redirect('main.ejs');
    } else {
        res.redirect('back');
    }
});

module.exports = router;