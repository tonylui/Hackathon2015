/**
 * Created by Hey on 20/6/15.
 */
//var SERVER_URL = "http://172.30.46.130:3000";
//var SERVER_URL = "http://52.74.226.158:3000";
var SERVER_URL = "http://54.169.59.167:3000";

var app = angular.module('myApp', ['freeDragger', 'ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        //configure the routing rules here
        $routeProvider.when('/user/:id', {
            controller: 'messagesCtrl'
        });

        //routing DOESN'T work without html5Mode
        $locationProvider.html5Mode({
            enabled: true
        });
    });

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
var delayBeforeCommit = 1000;

//app.controller('messagesCtrl', function ($scope, $http) {});

function setUpFaceBookLogin(){
    function statusChangeCallback(response) {
        if (response.status === 'connected') {
            updateUserInfo();
            updateFriendInfo();
        } else if (response.status === 'not_authorized') {
            document.getElementById('status').innerHTML = 'Please log into this app.';
        } else {
            document.getElementById('status').innerHTML = 'Please log into Facebook.';
        }
    }

    function checkLoginState() {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    }

    window.fbAsyncInit = function () {
        FB.init({
            appId: '1450937555212722',
            status: true,
            cookie: true,
            xfbml: true,
            oauth: true,
            version: 'v2.3'
        });
        FB.getLoginStatus(statusChangeCallback);
        FB.Event.subscribe('auth.statusChange', statusChangeCallback);
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

var loginFunction;


app.controller('messagesCtrl', function ($rootScope, $scope, $http,  $routeParams, $route, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.currentUser = "";
    $scope.searchedUser = "";

    $scope.changePath = function(){
        $location.path('/user/' + $scope.searchedUser);
    };

    //If you want to use URL attributes before the website is loaded
	loginFunction = function(){
    var username = "/user/" + $scope.currentUser;
    var api = "/notes";
    $http.get(SERVER_URL + username + api)
        .success(function (response) {
            $scope.messageJSON = response;
            
            //$scope.messageJSON = [{"_id":"55850ff9bcfbd5610e04f4f5","message":"123","username":"tonylui","byUser":"tonylui","lastUpdate":"2015-06-20T12:38:45.201Z","isPublic":false,"__v":0,"width":100,"height":100,"z":10,"y":10,"x":10}];
        });
	};

    $rootScope.$on('$routeChangeSuccess', function () {
        console.log('route is changed');
        console.log($routeParams.id);
        $scope.currentUser = $routeParams.id;
        loginFunction();
    });

	
	setUpFaceBookLogin();

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

function setUpMessageController(userid) {
    $("#noteBoard").html(
        '<div ng-controller="messagesCtrl">' +
        '<div ng-repeat="message in messageJSON">' +
        '<div draggable>' +
        '<textarea ng-model="message.message" ng-keyup="persistMessage(message)"></textarea>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
}
