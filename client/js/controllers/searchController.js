vibe.controller("SearchController", function ($scope, $routeParams, $uibModal, $log, $location, $document, $window, StudiosFactory) {

	$scope.searchTerm = $routeParams.searchTerm
	console.log($routeParams.studioSearch)

	if ($routeParams.studioSearch == '') {
			$scope.noneFound = true
	} else {
		$scope.tempStudios = $routeParams.studioSearch

	}
	$scope.dropDown = true;
	//for testing purposed	



	//function to show found studios information when selected
	$scope.seeProfile = function(studio) {
		$location.path('/profile').search({studio: studio});
	}



	//function to adjust search term/results

	$scope.search = function(){
			// yelpFactory.searchStudios(searchArea, function(output) {
			// 		console.log(output)
			// 	})
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