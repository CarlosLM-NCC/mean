/**
 * Created by Carlos on 11/02/2015.
 */
var mainApplicationModuleName= 'mean';
var mainApplicationModule= angular.module(mainApplicationModuleName,['ngResource','ngRoute','users','example','articles']);
//Configura el hashbang
mainApplicationModule.config(['$locationProvider',
function($locationProvider){
    $locationProvider.hashPrefix('!');    
}]);
angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName])
});