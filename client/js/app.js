var vibe = angular.module('vibe', ['ngRoute', 'ui.bootstrap', 'mwl.calendar', 
 'duScroll', 'ngAnimate']).value('duScrollDuration', 1500);;

var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;

vibe.config(function ($routeProvider, $locationProvider, calendarConfig) {
    $routeProvider
    .when('/', {templateUrl: "/static/partials/homePage.html"})
    .when('/artists', {templateUrl: "/static/partials/Artists.html"})
    .when('/studios', {templateUrl: "/static/partials/Studios.html"})
    .when('/profile', {templateUrl: "/static/partials/studioPage.html"})
    .when('/login', {templateUrl: "/static/partials/login.html"})
    .when("/signUp", {templateUrl: "/static/partials/signUp.html"})
    .when("/searchRequest", {templateUrl: "/static/partials/Search.html", onEnter: scrollContent} )
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
