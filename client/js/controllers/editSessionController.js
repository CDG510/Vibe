vibe.controller('editSessionController', function($scope, $uibModal, SessionsFactory, StudiosFactory, auth, $routeParams, usersFactory, DatesFactory, $location){

    if ($routeParams.session) {
        $scope.session = $routeParams.session;
    }
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser()

    $scope.today = function() {
        $scope.dt = new Date();
  };

    $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };
  // Disable weekend selection
 $scope.dateOptions1 = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: $scope.session.startsAt,
    startingDay: 0
  };

  $scope.dateOptions1 = {
     formatYear: 'yy',
     maxDate: new Date(2020, 5, 22),
     minDate: $scope.session.endsAt,
     startingDay: 0
   };

  // for the datepicker


  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };



  $scope.toggleMin();

  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.popup1 = {
	opened: false
  };

  $scope.popup2 = {
	opened: false
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[3];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.Zone = {
  	timeZone: null
  }

 $scope.hstep = 1;
  $scope.mstep = 30;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };


  ///need to add save button function
  $scope.editSession = function(){
      var parsedStartTime = DatesFactory.getThenParse($scope.session.startsAt, $scope.session.startsAt)
      var parsedEndTime = DatesFactory.getThenParse($scope.session.endsAt, $scope.session.endsAt);
      session = {
          startsAt: parsedStartTime,
          endsAt: parsedEndTime,
          artist: $scope.session.artist,
          title: $scope.session.artist,
          _id: $scope.session._id
      };
      SessionsFactory.updateSession(session, function(output){
          //reformat the parsed times
          var newStartHour = DatesFactory.unParseThenSet(output.startsAt);
          output.startsAt = newStartHour
          var endTime = DatesFactory.unParseThenSet(output.endsAt)
          output.endsAt =  endTime;
          var modalInstance = $uibModal.open({
              templateUrl: 'static/partials/successChange.html',
              controller: 'ModalInstanceCtrl',
              scope: $scope,
              resolve: {
                  studio: function() {
                      return output
                  }
              }
          })
          modalInstance.result.then( function () {
            $location.path("/profile/"+$scope.currentUser.username).search({key:null})
            $scope.session = {}
            });
         })
  }
});
