var vibe = angular.module('vibe', ['ngRoute', 'ui.bootstrap', 'ezfb']);

var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;

vibe.config(function ($routeProvider, $locationProvider, ezfbProvider) {
    $routeProvider
    .when('/', {templateUrl: "/static/partials/homePage.html"})
    .when('/artists', {templateUrl: "/static/partials/Artists.html"})
    .when('/studios', {templateUrl: "/static/partials/Studios.html"})
    .when('/profile', {templateUrl: "/static/partials/studioPage.html"})
    .otherwise({
        redirectTo: '/'
    });
  //    ezfbProvider.setInitParams({
  //   appId: '1530701907226627'
  // }); 
    // or
    // $window.FB.init(ezfbInitParams);

  //   $rootScope.$broadcast('en_US');
  // };

  	// ezfbProvider.setInitFunction(myInitFunction);
   //  ezfbProvider.setLocale('zh_TW')
   //  ezfbProvider.setInitParams({
   //  	appId: '1530701907226627'

   //  })
});


// , 'ngAnimate'