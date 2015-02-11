/**
 * Created by Carlos on 11/02/2015.
 */
angular.module('example').controller('ExampleController',['$scope', 'Authentication',
  function($scope, Authentication){
      $scope.name = Authentication.user ? Authentication.user.firstName : 'Aplicación Mean';
      $scope.fullName = Authentication.user ? Authentication.user.firstName +" "+ Authentication.user.lastName : 'Aplicación Mean';
  }
]);