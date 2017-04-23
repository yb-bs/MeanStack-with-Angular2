var mongoose = require( 'mongoose' );
var employees = mongoose.model( 'Employees' );


var app = angular.module('myApp', []);
app.controller('Controller', function($scope, $http) {
    $http({
        method : "GET",
        url : "welcome.htm"
    }).then(function succes(response) {
        $scope.myWelcome = response.data;
    }, function error(response) {
        $scope.myWelcome = response.statusText;
    });
});