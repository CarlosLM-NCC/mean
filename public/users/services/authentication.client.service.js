/**
 * Created by Carlos on 11/02/2015.
 */
angular.module('users').factory('Authentication',[
    function(){
        this.user = window.user;
        return {
            user: this.user
        };
    }
]);