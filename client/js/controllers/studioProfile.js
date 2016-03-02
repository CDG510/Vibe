vibe.controller("studioProfileController", function ($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, SessionsFactory, moment, alert, auth, $rootScope, usersFactory, DatesFactory, $sce) {

    $scope.currentUser = auth.currentUser()
    // console.log ($scope.currentUser)
    var endDay
		$scope.dropDown = true;
		$scope.existsFail = false;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.canEdit = false;
    $scope.beginEditing = false;
    console.log($routeParams)

  //if we searched to get here, set the profile page to that one
	if ($routeParams.studio) {
		// $scope.searched = false
    $scope.profile = $routeParams.studio;
	}
  //if we got here from a user, set the profile to that user
   if ($routeParams.user){
    $scope.profile = $routeParams.user
    console.log("set the user!")
  }

  if (!$routeParams.user || !$routeParams.studio) {
    var user = auth.currentUser()
    console.log(user)
    if (user !== undefined) {
        user.User = user._id
//get logged in user Info
usersFactory.getUserInfo(user, function(output){
        $scope.profile = output
    });
    }
    // $scope.profile 
  }
//get the person using it

//if the profile matches the current user, allow editing
  if ($scope.profile.username === $scope.currentUser.username){
    $scope.canEdit = true
      }
  //get date, parse it to number
  function getThenParse(date, hours) {
  var sessionHours = hours.getHours()
  var sessionMinutes = hours.getMinutes()
  date.setHours(sessionHours)
  date.setMinutes(sessionMinutes)
  return date.getTime()
}
//get parsedString, make it into a date
function unParseThenSet (parsed) {
  var unparsed = parseInt(parsed);
  var realTime = new Date()
  realTime.setTime(unparsed)
  return realTime
}

$scope.linkModelFunc = function (url){
  console.log('link model function' , url);
  $window.open(url);
}

//show modal
  $scope.showForm = function () {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);

            var modalInstance = $uibModal.open({
                templateUrl: 'static/partials/AddStudioTemplate.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
                resolve: {
                    newStudio: function () {
                        return $scope.newStudio;
                    }
                }
            });

            //on return
            modalInstance.result.then(function (studioForm) {
              // here we send it to the
              $scope.profile = studioForm

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                // $scope.successAdd = false
              });
        };


$scope.logOut = function(){
  auth.logOut()
}

	//function to delete account

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

///open schedule should toggle, not stay open

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

    // $scope.eventClicked = function(event) {
    //   alert.show("Clicked", event);
    // };

    // $scope.eventEdited = function(event) {
    //   alert.show('Edited', event);
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
 $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 0
  };

  // for the datepicker
$scope.disabled = function (date, mode) {
    return (mode === 'day' && (date.getDay() === $scope.profile.schedule.offDays[0].value || date.getDay() === $scope.profile.schedule.offDays[1].value || date.getDay() === $scope.profile.schedule.offDays[2].value || date.getDay() === $scope.profile.schedule.offDays[3].value || date.getDay() === $scope.profile.schedule.offDays[4].value || date.getDay() === $scope.profile.schedule.offDays[5].value || date.getDay() === $scope.profile.schedule.offDays[6].value));
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

  $scope.popup1 = {
	opened: false
  };

  $scope.popup2 = {
	opened: false
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

  $scope.Zone = {
  	timeZone: null
  }

 $scope.hstep = 1;
  $scope.mstep = 30;


console.log($scope.profile.openSchedule)
$scope.min = DatesFactory.unStringDate($scope.profile.schedule.startHour)
$scope.max = DatesFactory.unStringDate($scope.profile.schedule.endHour)


  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

//

});
