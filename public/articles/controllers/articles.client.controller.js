/**
 * Created by Carlos on 12/02/2015.
 */
'use strict'
//Crear el controller articles
angular.module('articles').controller('ArticlesController',['$scope', '$routeParams','$location', 'Authentication', 'Articles', 
    function($scope,$routeParams, $location, Authentication, Articles){
        //Exponer el servicio Authentication
        $scope.authentication =Authentication;
        
        //Crear un nuevo método para crear nuevos artículos
        $scope.create = function(){
            //Usar los campos form para crear un nuevo objeto $resource artículo
            var article = new Articles({
                titulo: this.titulo,
                contenido: this.contenido                
            });
            //Usar el método $save de article para enviar una petición POST apropiada
            article.$save(function(response){
                //Si un artículo fué creado de modo correcto, redireccionar al usuario a la página del artículo
                $location.path('articles/' + response._id);                
            }, function(errorResponse){
                //En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });            
        };
        // Crear un nuevo método controller para recuperar una lista de artículos
        $scope.find = function(){
            //Usar el método 'query' de article para enviar una petición GET apropiada
            $scope.articles = Articles.query();            
        };
        //Crear un nuevo método controller para recuperar un único artículo
        $scope.findOne = function(){
            //Usar el método 'get' de article para enviar una petición GET apropiada
            $scope.article = Articles.get({
                articleId: $routeParams.articleId                
            });            
        };
        //Crear un nuevo método controller paa actualizar un único artículo
        $scope.update = function(){
            //Usar el método '$update' de article para enviar una peticion PUT apropiada
            $scope.article.$update(function(){
                //Si un article fué actualizado de un modo correcto, redirigir el user a la página del artículo
                $location.path('articles/' + $scope.article._id);
            }, function(errorResponse){
                //En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };
        //Crea un método controller para borrar un único artículo
        $scope.delete =function(article){
            //Si un  artículo fue enviado al método, borrarlo
            if(article){
                //Usar el método '$remove' del artículo para borrar el artículo
                article.$remove(function(){
                    //Elimar el artículo de la lista de artículos
                    for (var i in $scope.articles){
                        if ($scope.articles[i] === article){
                            $scope.articles.splice(i,1);                            
                        }                        
                    }                    
                });
            }else{
                //En otro caso, usar el método '$remove' de article para borrar el article
                $scope.article.$remove(function(){
                    $location.path('articles');
                });
            }
        };
    }
]);