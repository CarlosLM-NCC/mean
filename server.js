/**
 * Created by Carlos on 06/02/2015.*/
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();
app.listen(3000);
module.exports = app;

console.log('Servidor esperando en pto 3000');