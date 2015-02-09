/**
 * Created by Carlos on 09/02/2015.
 */
// Invocar el método Javascript 'strict
'use strict';

// Cargar el módulo Mongoose y el objeto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir un nuevo 'UserSchema'
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String    
});

// Crea el modelo 'user' a partir del 'UserSchema'
mongoose.model('User',UserSchema);