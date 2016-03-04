vibe.controller("signUpController", function ($scope, $location, $routeParams, $document, $window, $anchorScroll, $uibModal, $log, auth, $rootScope) {


	$scope.dropDown = true;
$scope.newUser = {};
$scope.actualUser = {};
$scope.isLoggedIn = auth.isLoggedIn;

  // scope.setAsStudio = function() {
  //    $scope.newUser.profileType = "Studio";
  //   }
  //
  // //trigger preference, don't show studio options> This will determine what other options appear in profile page
  // $scope.setAsArtist = function() {
  //
  //   $scope.newUser.profileType = "Artist"
  //   $scope.newUser.schedule = {};
  //   $scope.newUser.ratings = [];
  //   $scope.newUser.price = 0
  //   $scope.newUser.businessName = ""
  // }

	$scope.signUp = function() {
    console.log($scope.newUser)
    auth.register($scope.newUser).error(function(error){
        $scope.error = error;
    }).then(function(output){
        console.log(output)
        $scope.currentUser = auth.currentUser()
		$scope.userName = output.data.user.username

        $location.path('/profile/'+$scope.userName).search({user: output.data.user});

    })
}


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
	//need to add a link to next studio
