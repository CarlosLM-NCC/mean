/**
 * Created by Carlos on 11/02/2015.
 */
// Invocar modo Javascript 'strict'
'use strict';
//Cargar las depencias del módulo
var mongoose = require('mongoose'),
    Article = mongoose.model('Article');
//Crea un nuevo método controller par el manejo de errores
var getErrorMessage = function(err){
    if(err.errors){
        for (var errName in err.errors){
            if (err.errors[errName].message) return err.errors[errName].message;            
        }        
    }else {
        return 'Error de servidor desconocido';        
    }    
};
//Crear un nuevo método controller para creAR los artículos
exports.create =function(req,res){
    //Crear un nuevo objeto artículo
    var article = new Article(req.body);
    //Configurar la propiedad 'creador' del artículo
    article.creador = req.user;
    //intentar salvar el artículo
    article.save(function(err){
        if(err){
            //si ocurre algún error envía el mensaje de error
            return res.status(400).send({
                message: getErrorMessage(err)                
            });
        }else{
            //Envía una representación JSON del artículo
            res.json(article);            
        }        
    });
};

//Crear un nuevo método controller que recupera la lista de artículos
exports.list = function(req,res){
    //Usar el método model 'find' para obtener la lista de artículos
    Article.find().sort('-created').populate('creador', 'firstName lastName fullname').exec(function(err,articles){
        if(err){
            //Si ocurre algún error envía el mensaje
            return res.status(400).send({
                message: getErrorMessage(err)                
            });            
        }else{
            //Enviar una representación JSON del artículo
            res.json(articles);            
        }        
    });    
};
//Crear un nuevo método controller que devuelve un artículo existente
exports.read = function(req,res){
    res.json(req.article) ;   
};
//Crear un nuevo método controller que actualiza un artículo existente
exports.update = function(req,res){
    //Obtener el artículo usando el objeto 'request'
    var article= req.article;
    //Actualizar los campos del artículo
    article.titulo =req.body.titulo;
    article.contenido = req.body.contenido;
    //Intentar salvar el artículo actualizado
    article.save(function(err){
        if(err){
            //Si ocurre un error enviar el mensaje de error
            return res.status(400).send({
                message: getErrorMessage(err)                
            });
        }else{
            //Enviar una respuesta JSON del artículo
            res.json(article);
        }
    });
};
//Crear un nuevo método controller que borre un artículo existente
exports.delete = function(req,res){
    //Obtener el artículo usando el objeto request
    var article = req.article;
    //Usar el método model 'remove' para borrar el artículo
    article.remove(function(err){
        if(err){
            //Si ocurre un error envía el mensaje de error
            return res.status(400).send({
                message: getErrorMessage(err)                
            });            
        }else{
            //enviar una respuesta JSON del artículo
            res.json(article);
        }        
    });
};
//Crear un nuevo controller middleware que recupera un único artículo  existente
exports.articleByID = function(req,res,next,id){
    //Usar método model 'findById' para encontrar un único artículo
    Article.findById(id).populate('creador','firstName lastName fullName').exec(function(err,article){
        if(err) return next(err);
        if (!article) return next(new Error('Fallo al cargar el artículo' + id));
        //Si un artículo es encontrado usar el objeto request para pasarlo al siguiente middleware
        req.article = article;
        //Llamar al siguiente midddleware
        next();
    });    
};
//Crear un nuevo controller middleware que es usado para autorizar una operacion article
exports.hasAuthorization = function(req,res,next){
    //Si el usuario actual no es el creador del artículo, enviar el mensaje de error apropiado
    if(req.article.creador.id !== req.user.id){
        return res.status(403).send({
            message: 'Usuario no esta autorizado'            
        });
    }
    //llamar al siguiente middleware
    next();
};
