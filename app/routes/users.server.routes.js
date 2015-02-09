/**
 * Created by Carlos on 09/02/2015.
 */
'use strict';

var users = require('../controllers/users.server.controller');

module.exports = function(app){
    app.route('/users').post(users.create)
    
};

