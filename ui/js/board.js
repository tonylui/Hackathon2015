/**
 * Created by Hey on 20/6/15.
 */
//var SERVER_URL = "http://172.30.46.130:3000";
var SERVER_URL = "http://52.74.226.158:3000";

var app = angular.module('myApp', ['freeDragger']);

function persistTextAreaText(text) {
    console.log("a");
    //scope.messageJSON
}


app.controller('messagesCtrl', function ($scope, $http) {
    $http.get(SERVER_URL+"/user/" + $scope.user.name + "/notes")
        .success(function (response) {
            $scope.messageJSON = response;
        });
    //$scope.messageJSON = [{"_id":"55850ff9bcfbd5610e04f4f5","message":"Hello Hackathon..some adjustment updated","username":"tonylui","byUser":"tonylui","lastUpdate":"2015-06-20T07:02:17.210Z","isPublic":false,"__v":0},{"_id":"55850ffabcfbd5610e04f4f6","message":"Hello Hackathon..some adjustment updated","username":"tonylui","byUser":"tonylui","lastUpdate":"2015-06-20T07:02:18.879Z","isPublic":false,"__v":0},{"_id":"55850ffbbcfbd5610e04f4f7","message":"Hello Hackathon..some adjustment updated","username":"tonylui","byUser":"tonylui","lastUpdate":"2015-06-20T07:02:19.742Z","isPublic":false,"__v":0},{"_id":"55850ffbbcfbd5610e04f4f8","message":"Hello Hackathon..some adjustment updated","username":"tonylui","byUser":"tonylui","lastUpdate":"2015-06-20T07:02:19.917Z","isPublic":false,"__v":0},{"_id":"55850ffcbcfbd5610e04f4f9","message":"Hello Hackathon..some adjustment updated","username":"tonylui","byUser":"tonylui","lastUpdate":"2015-06-20T07:02:20.075Z","isPublic":false,"__v":0},{"_id":"55850ffcbcfbd5610e04f4fa","message":"Hello Hackathon..some adjustment updated","username":"tonylui","byUser":"tonylui","lastUpdate":"2015-06-20T07:02:20.229Z","isPublic":false,"__v":0},{"_id":"55850ffcbcfbd5610e04f4fb","message":"Hello Hackathon..some adjustment updated","username":"tonylui","byUser":"tonylui","lastUpdate":"2015-06-20T07:02:20.394Z","isPublic":false,"__v":0},{"_id":"55850ffcbcfbd5610e04f4fc","message":"Hello Hackathon..some adjustment updated","username":"tonylui","byUser":"tonylui","lastUpdate":"2015-06-20T07:02:20.552Z","isPublic":false,"__v":0}];
    $scope.persist = persistTextAreaText;

});