/**
 * Created by Carlos on 11/02/2015.
 */
angular.module(('example')).config(['$routeProvider',
function($routeProvider){
    $routeProvider.
        when('/',{
            templateUrl: 'example/views/example.client.view.html'
        }).
        otherwise({
            redirectTo: '/'            
        });
}]);