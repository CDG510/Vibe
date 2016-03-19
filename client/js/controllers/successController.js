vibe.controller('successController', function($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, $rootScope, SessionsFactory, moment, alert, auth, usersFactory, DatesFactory, $sce, $window) {
    var user = auth.currentUser()
    if (user !== undefined) {
        user.User = user._id
//get logged in user Info
    usersFactory.getUserInfo(user, function(output){
            $scope.currentUser = output
            $scope.userID = $scope.currentUser.username
        });
    }

})
