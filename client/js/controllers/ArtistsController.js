vibe.controller("ArtistsController", function ($scope, $location, $routeParams, StudiosFactory, $document, $window) {

	console.log($routeParams)
	if ($routeParams.search == undefined) {
		$scope.searched = false
	} else {
		$scope.searchTerm = $routeParams.search
		$scope.searched = true
	}
	$scope.addStudio = false

	$scope.findStudioSearch = function() {
		StudiosFactory.findStudios($scope.studioSearch, function(output) {
			console.log(output)
			$scope.searched = true
			// this should print out the results below the search button, with all relevant info
			$scope.searchTerm = output
		});
	};

	//need to add a a studio
	$scope.addStudioButton = function() {
		$scope.addStudio = true
	}

	$scope.toggle = true;
    
    $scope.$watch('toggle', function(){
        $scope.toggleText = $scope.toggle ? 'Add a studio!' : 'Cancel';
    })
        if ($scope.toggleText == "Add a studio!") {
    	$scope.addStudio = true;
    }
	//need to add a link to next studio

});