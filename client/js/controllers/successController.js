vibe.controller('successController', function($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, $rootScope, SessionsFactory, moment, auth, usersFactory,  $window) {
    console.log($routeParams);


    $scope.logOut = function(){
      auth.logOut()
      $location.path("/").search(clearKey)
    }



    $scope.isLoggedIn = auth.isLoggedIn;
    var user = auth.currentUser()
    if (user === undefined) {
        user.User = user._id
//get logged in user Info
    usersFactory.getUserInfo(user, function(output){
            $scope.currentUser = output
            $scope.userID = $scope.currentUser.username
            console.log($scope.currentUser)
        });
    }

    $scope.saveStripe = function(){
        console.log(user);
        console.log($routeParams.code);
        auth.stripeSave({user: user, code: $routeParams.code}, function(result){
            console.log(result)
            					// $location.path('/profile/'+$scope.userName).search({user: output.data.user});
            $location.path('/profile/'+user.username+'/edit').search({key:null});
        })
    }

})
