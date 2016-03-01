vibe.controller("HomeController", function ($scope, $location, $routeParams, $document, $window, $anchorScroll, $uibModal, $log, StudiosFactory, auth, usersFactory) {

$scope.failSearch = false;
//
$scope.dropDown = true;
$scope.isLoggedIn = auth.isLoggedIn;

    var user = auth.currentUser()
    user.User = user._id
//get logged in user Info
usersFactory.getUserInfo(user, function(output){
        $scope.currentUser = output
    });

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
        console.log(output)
        $location.path('/searchRequest').search({studioSearch: output, searchTerm: $scope.studioSearch.searchTerm});
    })

    }
}

$scope.logOut = function(){
  auth.logOut()
}

$scope.goToProfile = function() {
    $location.path("/profile").search({user:$scope.currentUser })
}

//integrate yelp business search api?


  //function to scroll to div
    $scope.scrollTo = function(id) {
          var thisLocation = $location.hash(id);
          var someElement = angular.element(document.getElementById(id));
        $document.scrollToElementAnimated(someElement);
       }
    $scope.appendToEl = angular.element(document.querySelector('#toggleButton'))

//this monitors windows size
   $(window).on("resize.doResize", _.throttle(function (){
    //if the window goes beyond reformatting size
            if (window.innerWidth > 767) {
                $scope.$apply(function(){
                    //if the dropdown is active (meaning hidden)
                    if ($scope.dropDown == true) {
                        return
                    } else {
                        //otherwise disable it
                        $scope.dropDown = !$scope.dropDown
                    }
                });
            }


        },100));
});
