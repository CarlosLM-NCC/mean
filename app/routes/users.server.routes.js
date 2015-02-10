/**
 * Created by Carlos on 09/02/2015.
 */
'use strict';
//Carga el controller 'users'
var users = require('../controllers/users.server.controller'),
    passport = require('passport');

//Definir el método del modulo routes
module.exports = function(app){
    //Configurar las rutas 'sigup'
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    
    //Configura las routes 'signin'
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    
    //Configurar las rutas Google OAuth
    app.get('/oauth/google', passport.authenticate('google',{
        scope:[           
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        failureRedirect: '/signin',
        image_aspect_ratio: 'square',
        image_size : 50

    }));
    app.get('/oauth/google/callback', passport.authenticate('google',{
        failureRedirect: '/signin',
        successRedirect: '/'
    }));
    
    //Configurar la route 'signout'
    app.get('/signout',users.signout);
    
    //Configura la ruta base para 'users'
    app.route('/users')
        .post(users.create)
        .get(users.list) ;
    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);
        //Configura el parámetro middleware 'userId', poblara req.user
        app.param('userId',users.userById);
};

