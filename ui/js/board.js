/**
 * Created by Hey on 20/6/15.
 */
var app = angular.module('myApp', ['freeDragger']);
app.controller('messagesCtrl', function ($scope, $http) {
    $http.get("http://172.30.46.130:3000/user/" + $scope.user.name + "/notes")
        .success(function (response) {
            $scope.messageJSON = response;


        });
});