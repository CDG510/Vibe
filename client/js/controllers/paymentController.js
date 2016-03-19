vibe.controller('paymentController', function($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, $rootScope, SessionsFactory, moment, alert, auth, usersFactory, DatesFactory, $sce, $window) {

  console.log($routeParams)
  $scope.session = $routeParams.session;
  // $scope.session.startsAt = moment($scope.session.startTime).format('LT');
  // $scope.session.endTime = moment($scope.session.startTime).format('LT')
  $scope.studio = $routeParams.studio;
  var user = auth.currentUser()
  $scope.currentUser = user
//
//   if (user !== undefined) {
//       user.User = user._id
// //get logged in user Info
//   usersFactory.getUserInfo(user, function(output){
//           $scope.currentUser = output
//           $scope.userID = $scope.currentUser.username
//       });
//   }

  $scope.showForm = function () {

            var modalInstance = $uibModal.open({
                templateUrl: 'static/partials/AddStudioTemplate.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
                resolve: {
                    studio: function() {
                        return $scope.studio
                    }
                }
            })

            //on return
            modalInstance.result.then(function (studioForm) {
              // here we send it to the

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                // $scope.successAdd = false
                $location.path("/#/profile/"+$scope.currentUser.username).search({key: null})
              });
        };

        $scope.confirmSession = function(){
            $scope.session.artist = $scope.currentUser.username
            console.log("going to go save the session!")
            SessionsFactory.addSession($scope.session, function(output){
                console.log("yee we saved it")
                console.log(output)
                $scope.success = true
                $scope.showForm()
            })
        }

  //this monitors windows size

  });
