vibe.controller('paymentController', function($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, $rootScope, SessionsFactory, moment, alert, auth, usersFactory, DatesFactory, $sce, $window) {

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

  });
