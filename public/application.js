/**
 * Created by Carlos on 11/02/2015.
 */
var mainApplicationModuleName= 'mean';
var mainApplicationModule= angular.module(mainApplicationModuleName,[]);

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName])
});