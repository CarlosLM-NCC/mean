/**
 * Created by Carlos on 09/02/2015.
 */
// Invocar el método Javascript 'strict
'use strict';

// Cargar el módulo Mongoose y el objeto Schema
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

// Definir un nuevo 'UserSchema'
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type : String,
        //validar el formato email
        match : [/.+\@.+\..+/, "Por favor escribe una dirección email correcta"]
    },
    username: {
        type: String,
        //configurar la clave username como única
        unique: true,
        //Validar la existencia de username
        required: 'Nombre de usuario es obligatorio',
        //quitar espacios en blanco de username
        trim: true
    },
    password: {
        type: String,
        //Validar el valor length de password
        validate:[function(password){
            return password && password.length > 6;            
        },'La contraseña debe ser mas larga de 6']
    }, 
    salt:{
        type: String
    },
    provider: {
        type: String,
        //Validar existencia del valor provider
        required:'Provider es obligatorio'
    },
    providerId:String,
    providerData: {},
    created: {
        type: Date,
        //Crear un valor 'created' por defecto
        default: Date.now
    }
});
// Configurar la propiedad virtual 'fullName'
UserSchema.virtual('fullName').get(function(){
    return this.firstName + ' '+ this.lastName;    
}).set(function(fullName){
    var splitName = fullName.split(' ');
    this.firstName = splitName[0]|| '';
    this.lastName = splitName[1] || '';    
});

//Usar un middleware pre-save para hashear la contraseña
UserSchema.pre('save',function(next){
    if(this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
        this.password =this.hashPassword(this.password);
    }
    next();
});

//Crear un método instancia para hacer hashing a una contraseña
UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('base64');
};

//Crear un método instancia para autentificar al usuario
UserSchema.methods.authenticate = function(password){
    return this.password === this.hashPassword(password);
};

//Encontrar posibles username no usados
UserSchema.statics.findUniqueUsername = function(username,suffix,callback){
    var _this = this;
    //Añadir un sufijo username
    var possibleUsername = username + (suffix ||'');
    //Usar el método findOne del model 'User' para encontrar un username único disponible
    _this.findOne({username: possibleUsername},function(err,user){
        //Si ocurre un error llama al callback con un valor null
        if(!err){
            //Si encuentra un username unico disponible llama al callback
            if(!user){
                callback(possibleUsername);
            }else{ 
                return _this.findUniqueUsername(username,(suffix||0) +1, callback);
            }
        }else{callback(null)};
    });
};
//Crear el modelo 'user' a partir del 'UserSchema'
mongoose.model('User',UserSchema);