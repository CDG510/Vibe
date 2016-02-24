vibe.controller("loginController", function ($scope, $location, $routeParams, $document, $window, $anchorScroll, $uibModal, $log, auth){

//function to send form information to user/studio factory, route to profile page when successful

//
$scope.dropDown = true;
$scope.newUser = {};
$scope.actualUser = {};
$scope.newUser.preference= "artist";
console.log($scope.newUser)

$scope.makeArtist = function(){
    $scope.newUser.preference = 'artist';
}


$scope.makeStudio = function(){
    $scope.newUser.preference = 'studio';
}

$scope.signUp = function() {
    console.log($scope.newUser)
    auth.register($scope.newUser).error(function(error){
        $scope.error = error;
    }).then(function(output){
        console.log(output)
        $location.path('/profile').search({user: $scope.newUser});

    })
}
//     facebookService.getMyLastName($scope.newUser, function(output) {
//         console.log(output)
//     })
// }
// 

$scope.login = function() {
    console.log($scope.actualUser)
    auth.logIn($scope.actualUser).error(function(error){
        $scope.error = error;
    }).then(function(){
        $location.path('/profile').search({user: $scope.actualUser});
    })
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
