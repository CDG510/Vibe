vibe.controller("signUpController", function ($scope, $location, $routeParams, $document, $window, auth, $rootScope) {
	$scope.newUser = {};
	$scope.actualUser = {};
	$scope.isLoggedIn = auth.isLoggedIn;

	$scope.signUp = function() {
		if ($scope.newUser.password != $scope.newUser.passwordCheck){
			$scope.pwFailed = true;
			return
		} else if ($scope.newUser.password === undefined || $scope.newUser.email === undefined || $scope.newUser.userName === undefined){
			console.log($scope.newUser)
			$scope.tryAgain  = true;
			return
		}
		else {
			$scope.pwFailed = false;
			$scope.tryAgain = false;
			auth.register($scope.newUser).error(function(error){
					$scope.error = error;
				})
				.then(function(output){
					$scope.currentUser = auth.currentUser()
					$scope.userName = output.data.user.username
					$location.path('/profile/'+$scope.userName).search({user: output.data.user});
				})
		}
	}
})
