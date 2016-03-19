vibe.controller("ModalInstanceCtrl", function ($scope, $uibModalInstance,  StudiosFactory, auth, usersFactory, DatesFactory) {


    $scope.isLoggedIn = auth.isLoggedIn();

    var user = auth.currentUser()
        user.User = user._id
        console.log()
//get logged in user Info
    usersFactory.getUserInfo(user, function(output){
            $scope.currentUser = output
            console.log($scope.currentUser)
            $scope.session = output.sessions[output.sessions.length-1];
            var newStartHour = DatesFactory.unParseThenSet($scope.session.startsAt);
          $scope.session.startsAt = newStartHour
            var endTime = DatesFactory.unParseThenSet($scope.session.endsAt)
            $scope.session.endsAt =  endTime;
      })




    //dismiss modal
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
