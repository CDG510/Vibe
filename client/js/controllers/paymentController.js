vibe.controller('paymentController', function($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, $rootScope, SessionsFactory, moment, alert, auth, usersFactory, DatesFactory, $sce, $window) {
  console.log("WHAT IS GOING ON")
  $scope.dropDown = true;

  console.log($routeParams)
  $scope.session = $routeParams.session;
  $scope.session.startsAt = moment($scope.session.startTime).format('LT');
  $scope.session.endTime = moment($scope.session.startTime).format('LT')
  $scope.studio = $routeParams.studio;
  var user = auth.currentUser()

  if (user !== undefined) {
      user.User = user._id
//get logged in user Info
  usersFactory.getUserInfo(user, function(output){
          $scope.currentUser = output
          $scope.userID = $scope.currentUser.username
      });
  }

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
