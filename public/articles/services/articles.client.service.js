/**
 * Created by Carlos on 12/02/2015.
 */
//Invocar JavaScript strict
'use strict'
// Crear el service articles
angular.module('articles').factory('Articles',['$resource',function($resource){
    // Usar el service $resource para devolver un objeto '$resource? article
    return $resource('api/articles/:articleId',{
        articleId: '@_id'        
    },{
        update: {
            method: 'PUT'
        }        
    });
}]);
