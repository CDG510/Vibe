vibe.controller("signUpController", function ($scope, $location, $routeParams, $document, $window, auth, $rootScope) {
	$scope.newUser = {};
	$scope.actualUser = {};
	$scope.isLoggedIn = auth.isLoggedIn;

	$scope.signUp = function() {
    auth.register($scope.newUser).error(function(error){
	        $scope.error = error;
	    })
		.then(function(output){
	        $scope.currentUser = auth.currentUser()
			$scope.userName = output.data.user.username
	        $location.path('/profile/'+$scope.userName).search({user: output.data.user});
	    })
	}
})
