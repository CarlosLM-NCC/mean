/**
 * Created by Carlos on 09/02/2015.
 */
'use strict';
// Cargar el modelo Mongoose 'User'
var User = require('mongoose').model('User');
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

