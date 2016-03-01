vibe.controller("loginController", function ($scope, $location, $routeParams, $document, $window, $anchorScroll, $uibModal, $log, auth, $rootScope){

$scope.dropDown = true;
$scope.newUser = {};
$scope.actualUser = {};
$scope.isLoggedIn = auth.isLoggedIn;

//take info, register with passport, go to profile page
$scope.signUp = function() {
    console.log($scope.newUser)
    auth.register($scope.newUser).error(function(error){
        $scope.error = error;
    }).then(function(output){
        console.log(output)
        $scope.currentUser = auth.currentUser()

        $location.path('/profile').search({user: $scope.currentUser});

    })
}

//take login info, verify with passport, if pass, go to page
$scope.login = function() {
    console.log($scope.actualUser)
    auth.logIn($scope.actualUser).error(function(error){
        $scope.error = error;
    }).then(function(output){
        console.log(output, "came back to me!")
        $scope.currentUser = auth.currentUser()
        $location.path('/profile').search({user: $scope.currentUser});
    })
}
//function to scroll to position
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
