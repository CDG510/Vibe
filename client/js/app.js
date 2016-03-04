var vibe = angular.module('vibe', ['ngRoute', 'ui.bootstrap', 'mwl.calendar',
 'duScroll', 'multipleDatePicker', 'ngAnimate']).value('duScrollDuration', 1500);;

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
    .when('/profile/:id', {templateUrl: "/static/partials/studioPage.html", overrideRoot:true})
    .when('/login', {templateUrl: "/static/partials/login.html", controller: 'loginController'})
    .when("/signUp", {templateUrl: "static/partials/signUp.html", controller: "signUpController", overrideRoot: true})
    // .when("/signUp", {templateUrl: "/static/partials/signUp.html"})
    .when("/searchRequest", {templateUrl: "/static/partials/Search.html", onEnter: scrollContent} )
    .when("/userProfile/:id", {templateUrl: "static/partials/userPage.html", overrideRoot: true})
    .otherwise({
        redirectTo: '/'
    });

    var scrollContent = function() {
        $('html, body').animate({ scrollTop: 0 }, 100);
};
    calendarConfig.displayEventEndTimes = true;
    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';

});

vibe.run(function($rootScope, $window) {


  $rootScope.$on('$routeChangeSuccess', function () {

    var interval = setInterval(function(){
      if (document.readyState == 'complete') {
        $window.scrollTo(0, 0);
        clearInterval(interval);
      }
    }, 200);

  });
});
