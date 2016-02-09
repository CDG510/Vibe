vibe.controller("HomeController", function ($scope, $location, $routeParams, $document, $window) {

// var offsetHeight = $document[0].body.offsetHeight;
// var scrollHeight = $document[0].body.scrollHeight;
// var top = $document[0].body.getBoundingClientRect().top;

// console.log(offsetHeight, scrollHeight, top, "IS THE TOP")
// figure out how to animate the nav bar and make the collapsible menu nav bar thing
$scope.$watch(function () {
    return $window.scrollY;
}, function (scrollY) {
    if (scrollY > 50) {
    	console.log("time to animate the navbar bro")
    	// isn't responsive enough
    }

});

$scope.findStudioSearch = function() {
	console.log($scope.studioSearch)
	$location.path('/artists').search({search: $scope.studioSearch});

}

// function collapseNavbar() {
//     if ($(".navbar").offset().top > 50) {
//         $(".navbar-fixed-top").addClass("top-nav-collapse");
//     } else {
//         $(".navbar-fixed-top").removeClass("top-nav-collapse");
//     }
// }

// $(window).scroll(collapseNavbar);
// $(document).ready(collapseNavbar);
});