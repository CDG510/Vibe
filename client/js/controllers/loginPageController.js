vibe.controller("loginController", function ($scope, $location, $routeParams, $document, $window, $anchorScroll, $uibModal, $log, auth, usersFactory, $rootScope){

$scope.newUser = {};
$scope.actualUser = {};
$scope.isLoggedIn = auth.isLoggedIn;
var clearKey = {key: null}
    var user = auth.currentUser()
    if (user !== undefined) {
        user.User = user._id
//get logged in user Info
    usersFactory.getUserInfo(user, function(output){
            $scope.currentUser = output
            $scope.userID = $scope.currentUser.username
        });
    }
//take info, register with passport, go to profile page


//take login info, verify with passport, if pass, go to page
$scope.login = function() {
    auth.logIn($scope.actualUser).error(function(error){
        $scope.error = error;
    }).then(function(output){
        $scope.currentUser = auth.currentUser()
        $location.path('/profile/'+output.data.user.username).search(clearKey);
    })
}


})
