/**
 * Created by Carlos on 09/02/2015.
 */
// Invoca el método 'estrict' de javascript
'use strict';
// Carga las dependencias del módulo
var config = require('./config'),
    mongoose = require('mongoose');

// Definir el método de configuración de mongoose
module.exports = function(){
    // Usar mongoose para conectar a mongodb
    var db = mongoose.connect(config.db);
    
    // Cargar el modelo 'User'
    require('../app/models/user.server.model.js');
    
    // Devolver la instancia de conexión a Mongoose
    return db;
};
