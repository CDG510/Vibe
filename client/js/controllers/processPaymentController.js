vibe.controller("processPaymentController", function ($scope, $uibModalInstance, studio, $location,  StudiosFactory, auth, usersFactory, DatesFactory, SessionsFactory, $window) {

    // $window.Stripe.setPublishableKey('sk_test_ghnSVUwORQe2wvRk3tY5f2oU');

    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.studio = studio
    console.log(studio)
    if (session){
        $scope.session = session;
    }

    var user = auth.currentUser()
        user.User = user._id
//get logged in user Info
    usersFactory.getUserInfo(user, function(output){
            $scope.currentUser = output
      })

      console.log($scope.currentUser);
      $scope.goToProfile = function(){
          $location.path('/#/profile/'+studio.title).search({key: null})
          $uibModalInstance.dismiss('cancel')
      }

    //dismiss modal
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.pay= function(){

    }

    $scope.stripeCallback = function (code, result) {
    if (result.error) {
        window.alert('it failed! error: ' + result.error.message);
    } else {
        console.log(result);
        // window.alert('success! token: ' + result.id);
        var info = {
            artist: $scope.currentUser,
            studio: studio,
            token: result.id
        }
        console.log(info);
        // SessionsFactory.payForSession(info, function(output){
        //     console.log(output);
        //     $scope.successfulPayment = true;
        // })
    }
};

})
