vibe.controller("studioProfileController", function ($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, ezfb) {
		console.log($routeParams.studio)
	if ($routeParams.studio == undefined) {
		$scope.searched = false
	} else {
		$scope.profile = $routeParams.studio
		$scope.searched = true
	}




});