vibe.controller('editSessionController', function($scope, StudiosFactory, auth, $routeParams, usersFactory, DatesFactory, $location){

    if ($routeParams.session) {
        $scope.session = $routeParams.session
    }
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

  //should check for any overlaps, in calendar/sessions scheduled
  //if are deny, or make an approval check
  //if none, send to db to save, update in db, update in factory, return to profile page.
});
