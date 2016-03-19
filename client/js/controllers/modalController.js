vibe.controller("ModalInstanceCtrl", function ($scope, $uibModalInstance, studio,  StudiosFactory, auth, usersFactory, DatesFactory, SessionsFactory) {


    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.studio = studio
    var user = auth.currentUser()
        user.User = user._id
        console.log()
//get logged in user Info
    usersFactory.getUserInfo(user, function(output){
            $scope.currentUser = output
      })




    //dismiss modal
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
