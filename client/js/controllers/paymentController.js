vibe.controller('paymentController', function($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, $rootScope, SessionsFactory, moment, alert, auth, usersFactory, DatesFactory, $sce, $window) {

  console.log($routeParams)
  $scope.session = $routeParams.session;
  // $scope.session.startsAt = moment($scope.session.startTime).format('LT');
  // $scope.session.endTime = moment($scope.session.startTime).format('LT')
  $scope.studio = $routeParams.studio;
  var user = auth.currentUser()
  $scope.currentUser = user

//just for reformatting purposes
$scope.endTime = moment($scope.session.endHour).format("MMMM Do YYYY, h:mm:ss a")
$scope.startTime = moment($scope.session.startHour).format("MMMM Do YYYY, h:mm:ss a")

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
                // $location.path("/#/profile/"+$scope.currentUser.username).search({key: null})
              });
        };

        $scope.confirmSession = function(){
            // $scope.session.artist = $scope.currentUser.username
            SessionsFactory.addSession($scope.session, function(output){
                $scope.success = true
                $scope.showForm()
            })
        }

  //this monitors windows size

  });
