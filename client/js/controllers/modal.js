vibe.controller("ModalInstanceCtrl", function ($scope, $uibModalInstance, newStudio, StudiosFactory) {
    
    

    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.newStudio.$valid) {
        	console.log($scope.newStudio)
        	StudiosFactory.addStudioUser($scope.newStudio, function(output) {
        		console.log(output)
        	});
            console.log('user form is in scope with', $scope.form.newStudio);
            $uibModalInstance.close($scope.newStudio);

        } else {
            console.log('userform is not in scope');
            console.log($scope.form)
            console.log($scope.form.newStudio)
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});