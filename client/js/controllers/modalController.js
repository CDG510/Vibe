vibe.controller("ModalInstanceCtrl", function ($scope, $uibModalInstance, studio, $location,  StudiosFactory, auth, usersFactory, DatesFactory, SessionsFactory) {


    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.studio = studio
    console.log(studio)
    var user = auth.currentUser()
        user.User = user._id
//get logged in user Info
    usersFactory.getUserInfo(user, function(output){
            $scope.currentUser = output
      })


      $scope.goToProfile = function(){
          $location.path('/#/profile/'+studio.title).search({key: null})
          $uibModalInstance.dismiss('cancel')
      }

    //dismiss modal
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
