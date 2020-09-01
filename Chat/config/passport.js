const bcryptjs = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const {
    User,
    joinUser,
    removeUser,
    rooms_users,
    userin,
    userout,
    online_users
} = require('../models/user');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField : 'login'},(login,password,done)=> {

                User.findOne({login : login})
                .then((user)=>{
                 if(!user) {
                     return done(null,false);
                 }
                 
                 bcryptjs.compare(password, user.password, (err, isMatch)=>{
                    if(err) throw err;

                    if(isMatch) {
                        return done(null,user);
                    } else {
                        return done(null,false);
                    }
                 })
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