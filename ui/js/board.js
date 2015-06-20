/**
 * Created by Hey on 20/6/15.
 */
//var SERVER_URL = "http://172.30.46.130:3000";
var SERVER_URL = "http://52.74.226.158:3000";

var app = angular.module('myApp', ['freeDragger']);
app.controller('messagesCtrl', function ($scope, $http) {
    $http.get(SERVER_URL+"/user/" + $scope.user.name + "/notes")
        .success(function (response) {
            $scope.messageJSON = response;


        });
});