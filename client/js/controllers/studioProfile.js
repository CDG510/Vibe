vibe.controller("studioProfileController", function ($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, $rootScope, SessionsFactory, moment, alert, auth, usersFactory, DatesFactory, $sce, $window) {

    $scope.currentUser = auth.currentUser()
    // console.log ($scope.currentUser)
	$scope.dropDown = true;
	$scope.existsFail = false;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.canEdit = false;
    $scope.calendar = false;
    if (!$scope.profile) {
        $scope.isLoading = true
    }
//     ngCart.setTaxRate(0.00);
// ngCart.setShipping(0.00);

    if ($routeParams.id){
        usersFactory.getUserByName({username: $routeParams.id}, function(output){
            console.log(output)
            $scope.profile = output;
            $scope.isLoading=false;
            console.log($scope.profile, "is who's page we visit")
            if ($scope.profile.profileType === "Studio") {
                $scope.getSessions()
                $scope.session= {}
            }
            if ($scope.profile.username == $scope.currentUser.username) {
                $scope.canEdit = true;
            }

        });
    }

//if the profile matches the current user, allow editing

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
	//add sessions
	$scope.requestDates = function() {
        console.log($scope.session)
		if ($scope.session.startHour == null || $scope.session.endHour == null) {
			$scope.fail = true;
            return
		}

		else {
			$scope.fail = false;
				$scope.success = true;
				var parsedStartTime = DatesFactory.getThenParse($scope.session.startDate, $scope.session.startHour)
				 // var parsedStartTime = sessionStart ;
				 var parsedEndTime = DatesFactory.getThenParse($scope.session.endDate, $scope.session.endHour);
				 // packaging for DB
				session = {
                    startTime: parsedStartTime,
                    startHour:  $scope.session.startHour.toString(),
                    endHour:  $scope.session.endHour.toString(),
                    endTime: parsedEndTime,
                    info: $scope.session.info,
                    artist: $scope.session.artist,
                    studio: $scope.profile._id
                };
				SessionsFactory.checkSession(session, function(output){
					if (output === "exists") {
						$scope.existsFail = true;
					} else if (output === "invalid") {
                        $scope.invalidd = true;
                    } else {
						$scope.existsFail = false;
                        console.log(output)
                        // console.log (ngCart);

                        // $location.path('/checkout').search({session: output});

                        SessionsFactory.addSession(output, function(output){
                            $scope.getSessions();
                            $scope.events = output;
                            console.log($scope.events)
                            $scope.session = {};
                        })


					}
				})
			}
		}

///open schedule should toggle, not stay open
	$scope.openSchedule = function(){
        $scope.calendar = true;
        // getSessions()
    };

	//for calendar events
    $scope.sendMail = function(emailId,subject,message){
        $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
    };
    $scope.email = function() {
        $scope.sendMail($scope.profile.email,"Inquiry","");

    }

    $scope.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    $scope.deleteEvent = function(event){
        console.log(event);
        if ($scope.canEdit == true) {
            SessionsFactory.deleteSession(event, {id: $scope.profile._id}, function(output){
                console.log(output)
                $scope.events = output
            });
        }
    }

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

  $scope.eventClicked = function(event) {
     alert.show('Clicked', event);
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

  // $scope.setDate = function(year, month, day) {
  //   $scope.session.startDate = new Date(year, month, day);
  // };

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

  $scope.getSessions = function() {
      SessionsFactory.getSessions({User: $scope.profile._id},  function(output) {
        //this output will populate the schedule table
          $scope.min = DatesFactory.unStringDate(output.schedule.startHour)
          $scope.max = DatesFactory.unStringDate(output.schedule.endHour)
        if (output.sessions.length == 0) {
            $scope.calendarView ="month";
            // $scope.calendarTitle = $scope.profile.name
            $scope.viewDate = moment();
            // $scope.events = $scope.eventSource;
            $scope.isCellOpen = true;
            $scope.events = []
          $scope.noSessions = true;
        } else {
              for(session in output.sessions) {
                  //recombine date and time for calendar display
                  //make dates out of dateStrings
                  var newStartHour = DatesFactory.unParseThenSet(output.sessions[session].startsAt);
                  output.sessions[session].startsAt = newStartHour
                  var endTime = DatesFactory.unParseThenSet(output.sessions[session].endsAt)
                  output.sessions[session].endsAt =  endTime;
              };
                //set event source for calendar
              $scope.events = output.sessions;
              $scope.calendarView ="month";
              // $scope.calendarTitle = $scope.profile.name
              $scope.viewDate = moment();
              // $scope.events = $scope.eventSource;
              $scope.isCellOpen = true;
              console.log($scope.events)
          };
      })
  }

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


// });
