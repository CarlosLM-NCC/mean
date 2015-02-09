/**
 * Created by Carlos on 09/02/2015.
 */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function(){
    passport.use(new LocalStrategy(function(username, password, done){
        User.findOne({
            username: username
        },function(err,user){
            if(err){
                return done(err);                
            }
            if(!user){
                return done(null,false,{
                    message: 'Usuario desconocido'                    
                });                
            }
            if(!user.authenticate(password)){
                return done(null,false,{
                    message: 'Password no válido'                    
                })                
            }
            return done(null,user);            
        });      
    }));    
};