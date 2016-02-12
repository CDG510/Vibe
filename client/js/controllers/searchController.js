vibe.controller("SearchController", function ($scope, $routeParams, $uibModal, $log, $location, $document, $window, StudiosFactory) {

	$scope.searchTerm = $routeParams.studioSearch
	
	//for testing purposed	
	$scope.tempStudios = [
		{name: "the best",
		specialty: "everything",
		website: "www.thebestmayne.com",
		phone: 510-939-2341,
		price: 100
		},
		{name: "not the best",
		specialty: "nothing",
		website: "www.nothtebest.com",
		phone: 642-939-4352,
		price: 25}
	]


	//function to show found studios information when selected
	$scope.seeProfile = function(id) {
		console.log("go to this profile page")
	}

	//function to adjust search term/results

	//function to add studio of interest
});