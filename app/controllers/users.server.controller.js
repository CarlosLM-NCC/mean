/**
 * Created by Carlos on 09/02/2015.
 */
'use strict';
// Cargar el modelo Mongoose 'User' y passport
var User = require('mongoose').model('User'),
    passport = require('passport');

// Crear un nuevo método controller manejador de errores
var getErrorMessage = function(err){
    //Definir la variable de mensajes de error
    var message = '';
    //Si ocuure un error interno de MongoDb obtener el mensaje
    if(err.code){
        switch (err.code){
            //Si ocurre un error con un indice determinado configura el mensaje de error
            case 11000:
            case 11001:
                message = 'Usuario ya existe';
                break;
            //Si ocurre un error general configura el mensaje de error
            default:
                message = 'Se ha producido un error';
        }
    }else{
        //Grabar el primer mensaje de error de una lista de posibles errores
        for(var errName in err.errors){
            if(err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    
    //Devolver el mensaje de error
    return message;
};

//Crear un nuevo método controller que renderiza la página signin
exports.renderSignin = function(req,res,next){
    //Si el usuario no esta conectado rendirizar la página signin, en otro caso a la pagina principal
    if(!req.user){
        //usa el objeto response para renderizar la página signin
        res.render('signin',{
            //Configurar la variable 'title' de la página
            title: 'Formulario de acceso',
            //Configura la variable del mensaje flash
            messages: req.flash('error')|| req.flash('info')            
        });
    }else{
        return res.redirect('/')        
    }    
};
//Crear un nuevo método controller que renderiza la página signup
exports.renderSignup = function (req,res,next) {
    //Si el usuario no esta conectado rendirizar la página signup, en otro caso a la pagina principal
    if(!req.user){
        //usa el objeto response para renderizar la página sigup
        res.render('signup',{
            //Configurar la variable 'title' de la página
            title: 'Formulario registro',
            //Configura la variable del mensaje flash
            messages: req.flash('error')
        });
    }else{
        return res.redirect('/')
    }
};

//Crea un nuevo método controller que crea nuevos users
exports.signup = function(req,res,next){
    // Si user no esta conectado, crear y hacer login a un nuevo user, en otro caso redireccionar a la página principal de la aplicación
    if(!req.user){
        //Crea una nueva instancia del modelo 'User'
        var user = new User(req.body);
        var message = null;
        
        //Configurar la propiedad user provider
        user.provider = 'local';
        //Intenta salvar el nuevo documento user
        user.save(function(err){
            //Si ocurre un error, usa el mensaje flash para reportar el error
            if(err){
                //Usa el método de manejo de errores para obtener el error
                var message = getErrorMessage(err);
                //Configura los mensajes flash
                req.flash('error', message);
                //Redirecciona al usuario de vuelta a la página signup
                return res.redirect('/signup');
            }
            //Si el usuario fué creado de modo correcto usa el método login de Passport para hacer login
            req.login(user,function(err){
                //Si ocurre un error de login moverse al siguiente middleware
                if(err){ return next(err)};
                //Redireccionar al usuario de vuelta a la página de inicio
                return res.redirect('/');                
            });            
        });
    }else{
        return res.redirect('/');
    }    
};

//Crear un nuevo método controller que crea nuevos usuarios 'OAuth'
exports.saveOAuthUserProfile = function(req, profile, done){
    //Prueba a encontrar un documento user que fue registrado usando el actual provider OAuth
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId        
    },function(err,user){
        //Si ha ocurrido un error continua al siguiente middleware
        if(err){
            return done(err);            
        }else{
            //Si un usuario no ha pododo ser encontrado, crea un nuevo user, en otro caso, continúa al siguiente
            if(!user){
                //Configura un posible username base username
                var possibleUsername = profile.username || ((profile.email)?profile.email.split('@')[0]:'');
                
                //Encuentra un username único disponible
                User.findUniqueUsername(possibleUsername,null,function(availableUsername){
                    //Configura el nombre de usuario disponible
                    profile.username = availableUsername;
                    //Crear el user
                    user =new User(profile);
                    //Intenta salvar el nuevo documento user
                    user.save(function(err){
                        //Si error continúa al siguiente middleware
                        return done(err,user);                        
                    });                    
                });
            }else{
                //Continúa al siguiente middleware
                return done(err,user);                
            }
        }
    });
};

// Cargar un nuevo método controller 'create'
exports.create = function(req,res,next){
    //Crear una nueva instancia del modelo Mongoose 'User'
    var user = new User(req.body);
    //Usar el método 'save' de la instancia 'user' para salvar un nuevo documento user
    user.save(function(err){
        if(err){
            //llamar al siguiente middleware con un mensaje de error
            return next(err);
        }else{
            //usar el método 'response' para devolver una respuesta
            res.json(user);
        }
        
    })    
};
//Crear un nuevo método controller 'list'
exports.list = function(req,res,next){
    //Usa el método static 'User' 'find' para recuperar la lista de usuarios 
    User.find({}, function(err,users){
        if (err){
            //Llama al siguiente middleware con el mensaje de error
            return next(err);       
        }else{
            //Usa el objeto response para enviar una respuesta JSON
            res.json(users);            
        }
    })
};
//Crear un nuevo metodo controller read
exports.read = function(req,res){
    //Usa el objeto response para enviar una respuesta JSON
    res.json(req.user);
};
//Crea un middleware que  poblara user con el param id que se le pase
exports.userById = function (req,res,next,id) {
    //Usa el método static 'findOne' de 'User' para recuperar un usuario
    User.findOne({'_id': id},function(err,user){
        if (err){
            //Llama al siguiente middleware con un mensaje de error
            return next(err);            
        }else{
            //Asigna el valor de user al request
            req.user = user; 
            next();
        }        
    })
};
//Crear un método controller 'update'
exports.update = function(req,res,next){
    User.findByIdAndUpdate(req.user.id,req.body,function(err,user){
        if (err){
            next(err)
        }else{
            res.json(user);                       
        }
        
    })
    
};
//Crear un nuevo método controller 'delete'
exports.delete = function(req,res,next){
    //Usamos el método 'remove' de la instancia 'User' para eliminar un usuario
    req.user.remove(function(err){
        if(err){
            //Llama al siguente middleware con un mensaje de error
            return next(err);            
        }else{
            // Usa el objeto response para mandar una respuesta JSON
            res.json(req.user) ;           
        }        
    });
    
};
// Crea el método controller para el signing out
exports.signout = function(req,res){
    //Usa el método logout de passport para hacer logout
    req.logout();
    //Redirecciona a la página principal de la aplicación
    res.redirect('/');
};
//Crea un nuevo middleware controller que es usado para autorizar operaciones con artículos
exports.requiresLogin = function(req,res,next){
    //Si un usuario no está autentificado envía el mensaje de error apropiado
    if (!req.isAuthenticated()){
        return res.status(401).send({
            message: 'Usuario no está identificado'            
        });
    }
    //llama al siguiente middleware
    next();
}