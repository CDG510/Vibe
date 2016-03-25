vibe.controller("SearchController", function ($scope, $routeParams,  $log, $location, $document, $window, StudiosFactory, auth) {

	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser()
	$scope.searched = false
	if (!$routeParams || !$routeParams.searchTerm) {
		$scope.noneFound = true;
	} else {
		$scope.searchTerm = $routeParams.searchTerm
		if ($routeParams.studioSearch == '' || $routeParams.studioSearch.length< 1) {
				$scope.noneFound = true;
		} else {
			$scope.noneFound = false;
			$scope.searched = true;
			$scope.tempStudios  = $routeParams.studioSearch;
		}
	}

$scope.logOut = function(){
  auth.logOut()
}

	//function to show found studios information when selected
	$scope.seeProfile = function(studio) {
		$scope.thisUser = studio.username;
		$location.path('/profile/'+$scope.thisUser).search({'key': null});
	}

	// $scope.searchLimit = 20;
	$scope.searchSimple = function() {
	    //go to factory, to api call, get results, transfer to next partial
		$scope.searchTerm = $scope.searchPlace.searchTerm
	    if ($scope.searchPlace === undefined) {
	        //show fail message
	        return
	    } else {
			StudiosFactory.findStudiosSimple($scope.searchPlace, function(output){
			if (output.length < 1) {
				$scope.noneFound = true;
				$scope.searchPlace = {}
			}
			else {
				$scope.searched = true
				$scope.noneFound = false;
				$scope.tempStudios = output;
				$scope.searchPlace = {};
			}
	    })
		}
	}
	//function to adjust search term/results
	$scope.search = function(){
		//reconiguring
			$scope.searchTerm = $scope.searchPlace
			StudiosFactory.findStudiosAdvanced($scope.searchPlace, function(output){
				if (output.length < 1) {
					$scope.noneFound = true;
					$scope.searchPlace = {}
				}
				else {
					$scope.noneFound = false;
					$scope.searched = true
					$scope.tempStudios = output;
					$scope.searchPlace = {}
				}
			});
		}

});
