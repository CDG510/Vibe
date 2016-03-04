vibe.controller("SearchController", function ($scope, $routeParams,  $log, $location, $document, $window, StudiosFactory) {

	console.log($routeParams.studioSearch)

if (!$routeParams) {
	$scope.noneFound = false;
} else {
	$scope.searchTerm = $routeParams.searchTerm
	if ($routeParams.studioSearch == '') {
			$scope.noneFound = true
	} else {
		$scope.tempStudios = $routeParams.studioSearch

	}
}

	$scope.dropDown = true;
	//for testing purposed

	//function to show found studios information when selected
	$scope.seeProfile = function(studio) {
		$location.path('/profile').search({studio: studio});
	}


	$scope.searchStudios = function() {
	    //go to factory, to api call, get results, transfer to next partial
		console.log($scope.searchPlace)
		$scope.searchTerm = $scope.searchPlace.searchTerm
	    if ($scope.searchPlace === undefined) {
	        //show fail message
	        return
	    } else {
			StudiosFactory.findStudios	($scope.searchPlace, function(output){
				console.log(output)
			if (output.length < 1) {
				$scope.noneFound = true;
				$scope.searchPlace = {}
			}
			else {
				$scope.noneFound = false;
				$scope.tempStudios = output;
				$scope.searchPlace = {};
			}
	    })
		}
	}
	//function to adjust search term/results

	$scope.search = function(){
			// yelpFactory.searchStudios(searchArea, function(output) {
			// 		console.log(output)
			// 	})
			console.log($scope.searchPlace)
			$scope.searchTerm = $scope.searchPlace

			StudiosFactory.findStudios($scope.searchPlace, function(output){
				console.log(output)
				if (output.length < 1) {
					$scope.noneFound = true;
					$scope.searchPlace = {}
				}
				else {
					$scope.noneFound = false;
					$scope.tempStudios = output;
					$scope.searchPlace = {}
				}
			});
		}

	//function to add studio of interest


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
});
