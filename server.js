/**
 * Created by Carlos on 06/02/2015.*/
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('./config/express');
var app = express();
app.listen(3000);
module.exports = app;
console.log('Servidor esperando en pto 3000');