/**
 * Created by Carlos on 11/02/2015.
 */
var mainApplicationModuleName= 'mean';
var mainApplicationModule= angular.module(mainApplicationModuleName,['ngRoute','example']);
//Configura el hashbang
mainApplicationModule.config(['$locationProvider',
function($locationProvider){
    $locationProvider.hashPrefix('!');    
}]);
angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName])
});