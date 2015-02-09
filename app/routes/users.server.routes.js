/**
 * Created by Carlos on 09/02/2015.
 */
'use strict';
//Carga el controller 'users'
var users = require('../controllers/users.server.controller');
//Define el método routes module
module.exports = function(app){
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

