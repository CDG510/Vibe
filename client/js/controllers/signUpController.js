vibe.controller("signUpController", function ($scope, $location, $routeParams, $document, $window, $anchorScroll, $uibModal, $log, auth, $rootScope) {


	$scope.dropDown = true;
$scope.newUser = {};
$scope.actualUser = {};
$scope.isLoggedIn = auth.isLoggedIn;



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


})
	//need to add a link to next studio
