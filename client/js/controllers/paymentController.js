vibe.controller('paymentController', function($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, $rootScope, SessionsFactory, moment, alert, auth, usersFactory, DatesFactory, $sce, $window) {

  $scope.session = $routeParams.session;

  $scope.studio = $routeParams.studio;
  var user = auth.currentUser()
  $scope.currentUser = user

    //just for reformatting purposes
    $scope.endTime = moment($scope.session.endHour).format("MMMM Do YYYY, h:mm a")
    $scope.startTime = moment($scope.session.startHour).format("MMMM Do YYYY, h:mm a")

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

        };

        //go and confirm, take an save in db
        $scope.confirmSession = function(){
            // $scope.session.artist = $scope.currentUser.username
            SessionsFactory.addSession($scope.session, function(output){
                $scope.success = true
                $scope.showForm()
            })
        }

  });
