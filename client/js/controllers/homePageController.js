vibe.controller("HomeController", function ($scope, $location, $routeParams, $document, $window, $anchorScroll, $uibModal, $log, StudiosFactory, auth, usersFactory) {

$scope.failSearch = false;
$scope.isLoggedIn = auth.isLoggedIn;

    var user = auth.currentUser()
    if (user !== undefined) {
        user.User = user._id
//get logged in user Info
    usersFactory.getUserInfo(user, function(output){
            $scope.currentUser = output
            $scope.userID = $scope.currentUser.username
        });
    }


//function for studio search
$scope.searchStudios = function() {
    //go to factory, to api call, get results, transfer to next partial
    if ($scope.studioSearch === undefined) {
        //show fail message
        $scope.failSearch = true
        return
    } else {
        $scope.failSearch = false;
        StudiosFactory.searchStudios({location: $scope.studioSearch.searchTerm}, function(output){
            $location.path('/searchRequest').search({studioSearch: output, searchTerm: $scope.studioSearch.searchTerm});
    })

    }
}

$scope.logOut = function(){
  auth.logOut()
}

$scope.goToProfile = function() {
    $location.path("/profile/"+$scope.userID).search({key:null })
}


$scope.goToUserProfile = function() {
    $location.path("/userProfile/"+$scope.userID).search({user:$scope.currentUser })
}
//integrate yelp business search api?

  //function to scroll to div
    $scope.scrollTo = function(id) {
          var thisLocation = $location.hash(id);
          var someElement = angular.element(document.getElementById(id));
        $document.scrollToElementAnimated(someElement);
       }

});
