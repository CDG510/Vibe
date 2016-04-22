vibe.controller('paymentController', function($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, $rootScope, SessionsFactory, moment, alert, auth, usersFactory, DatesFactory, $sce, $window, $http) {
    console.log($routeParams)
    var code = $routeParams.code

    $http.post('https://connect.stripe.com/oauth/token',
     {
      grant_type: "authorization_code",
      client_id: 'ca_85HBoyAWwpEv8c4XhKzTSHsPUvrza10d',
      code: code,
      client_secret: 'sk_test_ghnSVUwORQe2wvRk3tY5f2oU'
  }).success(function(err, r, body) {
    // Do something with your accessToken
    // For demo"s sake, output in response:
        console.log(body)
    })
    
    $http.get('/returnForPayment').success(function (data){
        console.log(data)
        $scope.session = data.session;
        $scope.session.startsAt = moment($scope.session.startTime).format('LT');
        $scope.session.endTime = moment($scope.session.startTime).format('LT')
        $scope.studio = data.studio;
    })

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
