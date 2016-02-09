vibe.controller("confirmModalController", function ($scope, $uibModalInstance, $uibModal, studioSchedule, StudiosFactory) {
    
    $scope.form = {}
    $scope.confirm = function() {
        console.log($scope.studioSchedule)
        if ($scope.form.studioSchedule.$valid) {
            console.log($scope.studioSchedule)
            StudiosFactory.addStudioUser($scope.studioSchedule, function(output) {
                console.log(output)
            });
            console.log('user form is in scope with', $scope.form.studioSchedule);

        $uibModalInstance.close()
    }
    } 


    // $scope.form = {}
    // $scope.submitForm = function () {
    //     if ($scope.form.newStudio.$valid) {
    //       console.log($scope.newStudio)
    //       StudiosFactory.addStudioUser($scope.newStudio, function(output) {
    //         console.log(output)
    //       });
    //         console.log('user form is in scope with', $scope.form.newStudio);
    //         $uibModalInstance.close($scope.newStudio);

    //     } else {
    //         console.log('userform is not in scope');
    //         console.log($scope.form)
    //         console.log($scope.form.newStudio)
    //     }
    // };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});