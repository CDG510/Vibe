var vibe = angular.module('vibe', ['ngRoute', 'ui.bootstrap', 'mwl.calendar',
 'duScroll', 'multipleDatePicker', 'ngAnimate', 'angularMoment', "angularPayments"]).value('duScrollDuration', 1500);;
// 'ngCart'
var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;

vibe.config(function ($routeProvider, $locationProvider, calendarConfig) {
    var getPath = function(path) {
        return '/i' + (path.indexOf('/') === 0 ? path : '/' + path);
    };


    var config = {
        when: function(path, route) {
            if(route.overrideRoot) {
                $routeProvider.when(path, route);
            } else {
                var redirect = angular.copy(route);
                delete redirect.templateUrl;
                delete redirect.controller;
                redirect.redirectTo = getPath(path);
                $routeProvider
                    .when(path, redirect)
                    .when(getPath(path), route);
            }
            return this;
        }, otherwise: function(config) {
            $routeProvider.otherwise(config);
            return this;
        }
    };

    $routeProvider
    .when('/', {templateUrl: "/static/partials/homePage.html", overrideRoot: true})
    .when('/artists', {templateUrl: "/static/partials/Artists.html", overrideRoot: true})
    .when('/studios', {templateUrl: "/static/partials/Studios.html", overrideRoot: true})
    .when('/profile/:id', {templateUrl: "/static/partials/profilePage.html",overrideRoot:true})
    .when('/login', {templateUrl: "/static/partials/login.html", controller: 'loginController'})
    .when("/signUp", {templateUrl: "static/partials/signUp.html",  overrideRoot: true})
    .when("/oauth/callback", {templateUrl: "static/partials/success.html",  overrideRoot: true})
    .when("/searchRequest", {templateUrl: "/static/partials/Searchv2.html"} )
    .when('/profile/:id/edit', {templateUrl: "/static/partials/editProfilePage.html", overrideRoot: true})
    .when('/checkout', {templateUrl:'/static/partials/Checkout.html', controller: "paymentController"})
    .when('/checkout/success', {templateUrl: '/static/partials/success.html'})
    .when('/profile/:id/editSession', {templateUrl: "/static/partials/editSession.html", controller: 'editSessionController', overrideRoot: true})
    .otherwise({
        redirectTo: '/'
    });

    calendarConfig.displayEventEndTimes = true;
    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';

});
