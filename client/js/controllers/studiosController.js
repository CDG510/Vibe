vibe.controller("StudiosController", function ($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, ezfb) {
	// $scope.openModal = false
	

	$scope.successAdd = false
	 //  $scope.items = ['item1', 'item2', 'item3'];

  // $scope.animationsEnabled = true;
  	$scope.showForm = function () {
            $scope.message = "Show Form Button Clicked";
       
            var modalInstance = $uibModal.open({
                templateUrl: 'static/partials/AddStudioTemplate.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
                resolve: {
                    newStudio: function () {
                    	console.log($scope.newStudio, "back to original controlla")
                        return $scope.newStudio;
                    }
                }
            });

            modalInstance.result.then(function (studioForm) {
                $scope.newStudio = studioForm;
                console.log($scope.newStudio, "after promise/result")
                $scope.successAdd = true
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                $scope.successAdd = false
              });
        };

        $scope.toProfile = function() {
        	console.log($scope.newStudio)
			$location.path('/profile').search({studio: $scope.newStudio});
        }



	        

});
