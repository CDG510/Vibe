vibe.controller("studioProfileController", function ($scope, $location,  $routeParams, StudiosFactory, $uibModal, $log, $rootScope, SessionsFactory, moment, alert, auth, usersFactory, DatesFactory, $sce, $window) {

    $scope.currentUser = auth.currentUser()
    $scope.isLoggedIn = auth.isLoggedIn;
    //error messages when trying to signup
    $scope.errors = {
        existsFail: false,
        fail: false,
        invalidDate: false,
        invalidOrder: false,
        invalidStart: false,
        notDate: false
    }
    $scope.canEdit = false;
    $scope.calendar = false;
    $scope.max = 10;
    $scope.myInterval = 4000;
    $scope.session= {}
//set loading
    if (!$scope.profile) {
        $scope.isLoading = true
    }

    if ($routeParams.id){
        //get user info
        usersFactory.getUserByName({username: $routeParams.id}, function(output){
            //profile should be in db, set profile to what we get back
            $scope.profile = output;
            //if profile is the current user, they can edit
            if ($scope.profile.username == $scope.currentUser.username) {
                $scope.canEdit = true;
            }
            //populate the sessions array
            //set min/max for studio
            if ($scope.profile.profileType == "Studio"){
                $scope.min = DatesFactory.unStringDate(output.schedule.startHour)
                $scope.max = DatesFactory.unStringDate(output.schedule.endHour)
            }
            //if no sessions, set up calendar
            if (output.sessions.length == 0) {
                $scope.calendarView ="month";
                $scope.isCellOpen = true;
                $scope.events = []
                $scope.viewDate = new Date()
                $scope.noSessions = true;
            } else {
                //put sessions into factory for reference/checks
                SessionsFactory.setSessions(output.sessions);
                  for(session in output.sessions) {
                      //recombine date and time for calendar display
                      //make dates out of parsed dates
                      var newStartHour = DatesFactory.unParseThenSet(output.sessions[session].startsAt);
                      output.sessions[session].startsAt = newStartHour
                      var endTime = DatesFactory.unParseThenSet(output.sessions[session].endsAt)
                      output.sessions[session].endsAt =  endTime;
                      // change the title (for the calendar's use) to the studio the artist booked with

                      //studioAdded a session, not the artist  OR if this profile DIDN"T added add a session, show the artist
                      if(output.sessions[session].addedBy == output.sessions[session].studioName && $scope.profile.profileType == "Studio" && $scope.canEdit == true){
                          output.sessions[session].title = output.sessions[session].artist
                      }
                      //if artist added session, not the studio, show the studio name on the artists page
                      if ( output.sessions[session].addedBy == output.sessions[session].artist && $scope.profile.profileType == "Artist" && $scope.canEdit == true){
                          output.sessions[session].title = output.sessions[session].studioName
                      }
                      //if artist added session & artist's profile, show the studio
                      if(output.sessions[session].addedBy == output.sessions[session].artist && output.sessions[session].artist == $scope.profile.username ){
                          output.sessions[session].title = output.sessions[session].studioName
                      }
                      //if artist added session, not studio, and on studio page, show the artist
                  };
                    //set event source for calendar
                  $scope.events = output.sessions;
                  $scope.calendarView ="month";
                  $scope.viewDate = new Date()
                  $scope.isCellOpen = true;
              };
              //end loading
            $scope.isLoading=false;
        });
    }

    $scope.logOut = function(){
      auth.logOut()
      $location.path("/").search({key:null})
    }

    	//add sessions
	$scope.requestDates = function() {
        //if missing fields
		if ($scope.session.startHour == null || $scope.session.endHour == null || $scope.session.startDate == null || $scope.session.endDate == null) {
			$scope.errors.fail = true;
            return
            //if not a date/other
		} else if ($scope.session.startDate instanceof Date == false || $scope.session.endDate instanceof Date == false){
            $scope.errors.notDate = true;
            return
        }
		else {
			$scope.errors.fail = false;
            $scope.errors.notDate = false;
            //parse dates for checks
			var parsedStartTime = DatesFactory.getThenParse($scope.session.startDate, $scope.session.startHour)
			var parsedEndTime = DatesFactory.getThenParse($scope.session.endDate, $scope.session.endHour);
			 // packaging for DB
			session = {
                startTime: parsedStartTime,
                startHour:  $scope.session.startHour.toString(),
                endHour:  $scope.session.endHour.toString(),
                endTime: parsedEndTime,
                info: $scope.session.info,
                artist: $scope.currentUser.username,
                studio: $scope.profile._id,
                addedBy: $scope.currentUser.username,
                title: $scope.currentUser.username,
                studioName: $scope.profile.username
            };
            //set artist and title if studio, for reference purposes
            if ($scope.canEdit == true){
                session.artist = $scope.session.artist;
                session.title = session.artist
            }
            //check to make sure it's valid and doesn't already exist from the studio
			SessionsFactory.checkSession(session, function(output){
				if (output === "exists") {
					$scope.errors.existsFail = true;
                    return
				} else if (output === "invalidDate") {
                    $scope.errors.invalidDate = true;
                    return
                }
                else if (output === "invalidStart"){
                    $scope.errors.invalidStart = true;
                    return
                }
                 else {
                     $scope.errors =  false;
                    var session = output
                    if($scope.canEdit == true) {
                        SessionsFactory.SelfAddSession(session, function(newSessions){
                            var modalInstance = $uibModal.open({
                                templateUrl: 'static/partials/studioAddSuccess.html',
                                controller: 'ModalInstanceCtrl',
                                scope: $scope,
                                resolve: {
                                    studio: function() {
                                        return $scope.session
                                    }
                                }
                            })
                            modalInstance.result.then(function (studioForm) {
                            }, function () {
                                $scope.events = newSessions;
                                $scope.session = {};
                              });
                        })
                }
                //if not self, go to check out page
                else {
                    $location.path("/checkout").search({studio: $scope.profile, session: session})
                }
				}
			})
		}
	}

///Only because the usual configuration isn't working
	$scope.openSchedule = function(){
        if($scope.calendar === true){
          $scope.calendar = false;
        } else {
          $scope.calendar = true;
        }
    };

    $scope.sendMail = function(emailId,subject,message){
        $window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
    };

    $scope.email = function() {
      if ($scope.canEdit == true){
        $scope.sendMail("christian.d.gonzalez.92@gmail.com","Inquiry","");
        return
      } else {
        $scope.sendMail($scope.profile.email,"Inquiry","");
      }
    }


    $scope.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

//open th image gallery for larger viewing
    $scope.showGallery = function(){
        var modalInstance = $uibModal.open({
            templateUrl: 'static/partials/gallery.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            resolve: {
                studio: function(){
                    return $scope.profile
                }
            }
        })
    };

//only let profile's user edit and only if it was them who added
$scope.editEvent = function(event) {
    if($scope.canEdit == true || event.studioName == $scope.currentUser.username){
        $location.path("/profile/"+$scope.currentUser.username+"/editSession").search({session: event})
    } else {
        var modalInstance = $uibModal.open({
            templateUrl: 'static/partials/failMessage.html',
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            resolve: {
                studio: function() {
                    return $scope.profile
                }
            }
        })
    }
}


//only be able to delete events if you can edit(self profile)
    $scope.deleteEvent = function(event){
        if ($scope.canEdit == true || event.studioName == $scope.currentUser.username) {
            SessionsFactory.deleteSession(event, {id: $scope.profile._id}, function(output){
                $scope.events = output
            });
        } else {
            var modalInstance = $uibModal.open({
                templateUrl: 'static/partials/failMessage.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
                resolve: {
                    studio: function() {
                        return $scope.profile
                    }
                }
            })
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

});
