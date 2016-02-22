vibe.controller("loginController", function ($scope, $location, $routeParams, $document, $window, $anchorScroll, $uibModal, $log, usersFactory){

//function to send form information to user/studio factory, route to profile page when successful

//
$scope.dropDown = true;


$scope.signUp = function() {
    usersFactory.addUser($scope.newUser, function(output) {
    })
    // facebookService.getMyLastName($scope.newUser, function(output) {
    //     console.log(output)
    // })
}


$scope.login = function() {
}
$scope.scrollTo = function(id) {
      var thisLocation = $location.hash(id);
      var someElement = angular.element(document.getElementById(id));
    $document.scrollToElementAnimated(someElement);
   }
$scope.appendToEl = angular.element(document.querySelector('#toggleButton'))

$(window).on("resize.doResize", _.throttle(function (){
 //if the window goes beyond reformatting size
         if (window.innerWidth > 767) {
             $scope.$apply(function(){
                 //if the dropdown is active (meaning hidden)
                 if ($scope.dropDown == true) {
                     return
                 } else {
                     //otherwise disable it
                     $scope.dropDown = !$scope.dropDown
                 }
             });
         }


     },100));

})
