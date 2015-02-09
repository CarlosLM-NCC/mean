/**
 * Created by Carlos on 06/02/2015.
 */
    
//Cargar las dependencias del módulo    
var config = require('./config'),
    session = require('express-session'),
    express = require('express'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    passport = require('passport');


module.exports = function (){
    // Crear nueva instancia de la aplicación Express
    var app = express();
    
    // Usar la variable Node_ENV para activar los middleware 'morgan' 'logger' o 'compress'
    if (process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }else if(process.env.NODE_ENV === 'production'){
        app.use(compress());
    }
    // Usar las funciones middleware body-parser u method-override
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    //Configurar el middlewaere 'session'
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    //Configurar el motor de las vistas de la aplicacion y el directorio de las 'views'
    app.set('views','./app/views');
    app.set('view engine', 'ejs');
    
    //Inicializa passport en la instancia de la aplicación express
    app.use(passport.initialize());
    app.use(passport.session());
    
    //Cargar los archivos de enrutamiento
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    
    //Configurar el servidor de archivos estáticos
    app.use(express.static('./public'));
    
    //Devolver la instancia de la aplicación Express
    return app;
    
};

