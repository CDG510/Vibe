vibe.controller("StudiosController", function ($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, ezfb) {
	$scope.openModal = false
	


	 //  $scope.items = ['item1', 'item2', 'item3'];

  // $scope.animationsEnabled = true;
  	$scope.showForm = function () {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);
    //         ezfb.login(function (res) {
    //   /**
    //    * no manual $scope.$apply, I got that handled
    //    */
    //   if (res.authResponse) {
    //     updateLoginStatus(updateApiMe);
    //   }
    // }, {scope: 'email,user_likes'});
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

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                

                console.log($scope.selected, "after promise/result")
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                            });
        };



	        

});
