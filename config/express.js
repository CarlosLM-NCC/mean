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
    if (process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }else if(process.env.NODE_ENV === 'production'){
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    app.set('views','./app/views');
    app.set('view engine', 'ejs');
    
    require('../app/routes/index.server.routes.js')(app);
    app.use(express.static('./public'));
    return app;
    
};

