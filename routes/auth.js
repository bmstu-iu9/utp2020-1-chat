const express = require('express');
const router = express.Router();
const bodyParser = require ('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res)=>{
    res.render("login.ejs");
});

router.post('/', (req, res, next)=>{
    passport.authenticate('local',{
        successRedirect : '/main',
        failureRedirect : '/login'
        })(req,res,next);
});

module.exports = router;