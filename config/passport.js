const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField : 'login'},(login,password,done)=> {

                User.findOne({login : login})
                .then((user)=>{
                 if(!user) {
                     return done(null,false);
                 }
                 
                 if (password == user.password) {
                     return done(null, user);
                 } else {
                     return done(null, false);
                 }
                })
                .catch((err)=> {console.log(err)})
        })
        
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      }); 
}; 