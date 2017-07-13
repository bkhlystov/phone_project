import angular from "angular";

import  ngRoute from "angular-route";

import  ngStorage from "ngstorage";




var app = angular.module("app", ['ngRoute', 'ngStorage']);

//Роутинг по главной странице и
app.config(function($routeProvider){
    $routeProvider.when('/phones', {
        controller: "mainCtrl",
        templateUrl: "./static/app/templates/phones.html"
    });
    $routeProvider.when('/phones/:phoneId', {
        controller: "descriptCtrl",
        templateUrl: "./static/app/templates/description.html"
    });
    $routeProvider.otherwise({
        redirectTo: '/phones'
    })
});
export {app};
