/**
 * Created by Carlos on 06/02/2015.
 */
    
    
var config = require('./config'),
    session = require('express-session'),
    express = require('express'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    morgan = require('morgan'),
    methodOverride = require('method-override');

module.exports = function (){
    var app = express();
    app.use(bodyParser);
    require('../app/routes/index.server.routes.js')(app);
    return app;
    
};

