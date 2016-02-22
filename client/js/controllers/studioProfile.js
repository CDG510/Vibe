vibe.controller("studioProfileController", function ($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, SessionsFactory, moment, alert) {
		console.log($routeParams.studio)
		$scope.profile = $routeParams.studio
		$scope.dropDown = true;
		$scope.existsFail = false

	if ($routeParams.studio == undefined) {
		$scope.searched = false
	} else {
		$scope.profile = $routeParams.studio
		$scope.searched = true
	}

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function convertDateToUTC(date) { 
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
}

function getThenParse(date, hours) {
	var sessionHours = hours.getHours()
	var sessionMinutes = hours.getMinutes()
	date.setHours(sessionHours)
	date.setMinutes(sessionMinutes)
	return date.getTime()
}

function unParseThenSet (parsed) {
	var unparsed = parseInt(parsed);
	var realTime = new Date()
	realTime.setTime(unparsed)
	return realTime
}
	//function to edit information

	//function to delete

	//function to add/setup account information like dates/hours/payment etc

	$scope.requestDates = function(){

		if ($scope.session.startHour == null || $scope.session.endHour == null) {
			$scope.fail = true;
		}

		else {
			$scope.fail = false;
				$scope.success = true;
				var parsedStartTime = getThenParse($scope.session.startDate, $scope.session.startHour)
				 // var parsedStartTime = sessionStart ;
				 var parsedEndTime = getThenParse($scope.session.endDate, $scope.session.endHour);
				 // packaging for DB
				session = {startTime: parsedStartTime, startHour:  $scope.session.startHour.toString(), endHour:  $scope.session.endHour.toString(), endTime: parsedEndTime, info: $scope.session.info, artist: $scope.session.artist, studio: $scope.profile._id};
				SessionsFactory.addSession(session, function(output){
					if (output == "exists") {
						$scope.existsFail = true;
					} else {
						$scope.existsFail = false;
						$scope.session = {};
					}
				}) 
			}
		}

///open schedule should toggle, not

	$scope.openSchedule = function(){
		$scope.calendar = true;
    	SessionsFactory.getSessions({studio: $scope.profile._id},  function(output) {
      //this output will populate the schedule table
      if (output.sessions.length == 0) {
      	$scope.noSessions = true;
      } else {
      	
      	for(session in output.sessions) {
	      	//recombine date and time for calendar display
	      	//make dates out of dateStrings
	      	var newStartHour = unParseThenSet(output.sessions[session].startsAt);
	      	output.sessions[session].startsAt = newStartHour

	      	var newEndHour = output.sessions[session].endsAt
	      	var endTime = unParseThenSet(newEndHour)

	      	output.sessions[session].endsAt =  endTime;
	  	      };
	      //set event source for calendar
	      $scope.eventSource = output.sessions;
    	};     
		})
    };

	//for calendar events

    $scope.calendarView ="month";
    $scope.calendarTitle = $scope.profile.name
    $scope.viewDate = moment();
    $scope.events = $scope.eventSource;

    $scopeisCellOpen = true;

    $scope.eventClicked = function(event) {
      alert.show("Clicked", event);
    };

    $scope.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    // $scope.eventClicked = function(event) {
    //   alert.show('Clicked', event);
    // };


    // $scope.eventDeleted = function(event) {
    //   alert.show('Deleted', event);
    // };

    // $scope.eventTimesChanged = function(event) {
    //   alert.show('Dropped or resized', event);
    // };

    $scope.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

	$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection

  // for the datepicker
  $scope.disabled = function(date, mode) {
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  };

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

  $scope.setDate = function(year, month, day) {
    $scope.session.startDate = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[3];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

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

  

});


