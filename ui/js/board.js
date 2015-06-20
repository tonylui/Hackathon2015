/**
 * Created by Hey on 20/6/15.
 */
//var SERVER_URL = "http://172.30.46.130:3000";
//var SERVER_URL = "http://52.74.226.158:3000";
var SERVER_URL = "http://54.169.59.167:3000";

var app = angular.module('myApp', ['freeDragger']);

var persistMessage = function (message) {
    console.log(message._id);
    console.log(message.message);

    var api = "/" + message._id;
    $http.put(SERVER_URL + username + api, {
        "message": message.message,
        "x": message.x,
        "y": message.y,
        "z": message.z,
        "width": message.width,
        "height": message.height
    })
        .success(function (response) {
            console.log("updated");
        })
        .error(function (response) {
            console.log("failed");
        });
};

var dict_commit_intervals = {};
var delayBeforeCommit = 2000;
app.controller('messagesCtrl', function ($scope, $http) {});

function setUpMessageController(userid) {
    app.controller('messagesCtrl', function ($scope, $http) {
        //var username = "/user/" + $scope.user.name;
        username = "/user/" + userid;
        var api = "/notes";
        $http.get(SERVER_URL + username + api)
            .success(function (response) {
                $scope.messageJSON = response;
                //$scope.messageJSON = [{"_id":"55850ff9bcfbd5610e04f4f5","message":"123","username":"tonylui","byUser":"tonylui","lastUpdate":"2015-06-20T12:38:45.201Z","isPublic":false,"__v":0,"width":100,"height":100,"z":10,"y":10,"x":10}];
            });

    $scope.addNewNote = function(){
        var message = {
            "message": "Write some note",
            "x" : 200,
            "y" : 200,
            "z": 200,
            "width": 200,
            "height": 200
        };

        $http.post(SERVER_URL + username + api, message)
            .success(function (response) {
                console.log("added a new note");
                $http.get(SERVER_URL + username + api)
                    .success(function (response) {
                        $scope.messageJSON = response;
                        //$scope.messageJSON = [{"_id":"55850ff9bcfbd5610e04f4f5","message":"123","username":"tonylui","byUser":"tonylui","lastUpdate":"2015-06-20T12:38:45.201Z","isPublic":false,"__v":0,"width":100,"height":100,"z":10,"y":10,"x":10}];
                    });
                console.log("refresh note from server");
            })
            .error(function (response) {
                console.log("failed");
            });

    };

    $scope.persistMessage = function (message) {
        clearInterval(dict_commit_intervals[message._id]);
        dict_commit_intervals[message._id]=setInterval(commitRequest, 5000);

            function commitRequest() {
                console.log(message._id);
                console.log(message.message);
                var api = "/" + message._id;
                $http.put(SERVER_URL + username + api, {
                    "message": message.message,
                    "x": message.x,
                    "y": message.y,
                    "z": message.z,
                    "width": message.width,
                    "height": message.height
                })
                    .success(function (response) {
                        console.log("updated");
                        clearInterval(dict_commit_intervals[message._id]);
                        console.log("interval stopped");
                    })
                    .error(function (response) {
                        console.log("failed");
                    });
            }

        };

    });
}