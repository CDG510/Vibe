var vibe = angular.module('vibe', ['ngRoute', 'ui.bootstrap', 'duScroll']).value('duScrollDuration', 500);;

var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;

vibe.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {templateUrl: "/static/partials/homePage.html"})
    .when('/artists', {templateUrl: "/static/partials/Artists.html"})
    .when('/studios', {templateUrl: "/static/partials/Studios.html"})
    .when('/profile', {templateUrl: "/static/partials/studioPage.html"})
    .when('/login', {templateUrl: "/static/partials/login.html"})
    .when("/signUp", {templateUrl: "/static/partials/signUp.html"})
    .otherwise({
        redirectTo: '/'
    });

});
