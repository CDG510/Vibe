vibe.controller("studioProfileController", function ($scope, $location, $routeParams, StudiosFactory, $uibModal, $log, $rootScope, SessionsFactory, moment, alert, auth, usersFactory, DatesFactory, $sce, $window) {

    $scope.currentUser = auth.currentUser()
	$scope.existsFail = false;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.canEdit = false;
    $scope.calendar = false;
    $scope.max = 10;


    if (!$scope.profile) {
        $scope.isLoading = true
    }

    if ($routeParams.id){
        //get user info
        usersFactory.getUserByName({username: $routeParams.id}, function(output){
            //profile should be in db, set profile to what we get back
            $scope.profile = output;
            if ($scope.profile.username == $scope.currentUser.username) {
                $scope.canEdit = true;
            }
            //populate the sessions array
            // $scope.getSessions()
            if ($scope.profile.profileType == "Studio"){
                $scope.min = DatesFactory.unStringDate(output.schedule.startHour)
                $scope.max = DatesFactory.unStringDate(output.schedule.endHour)
            }
            //if no sessions,
            if (output.sessions.length == 0) {
                $scope.calendarView ="month";
                $scope.isCellOpen = true;
                $scope.events = []
                $scope.viewDate = new Date()
                $scope.noSessions = true;
            } else {
                  for(session in output.sessions) {
                      //recombine date and time for calendar display
                      //make dates out of parsed dates
                      var newStartHour = DatesFactory.unParseThenSet(output.sessions[session].startsAt);
                      output.sessions[session].startsAt = newStartHour
                      var endTime = DatesFactory.unParseThenSet(output.sessions[session].endsAt)
                      output.sessions[session].endsAt =  endTime;
                      // change the title (for the calendar's use) to the studio the artist booked with

                      //studioAdded a session, not the artist   OR if this profile DIDN"T added add a session, show the artist
                      if(output.sessions[session].addedBy == output.sessions[session].studioName && $scope.profile.profileType == "Studio" && $scope.canEdit == true){
                          output.sessions[session].title = output.sessions[session].artist
                      }
                      //if artist added session, not the studio, show the studio name on the artists page
                      if ( output.sessions[session].addedBy == output.sessions[session].artist && $scope.profile.profileType == "Artist" && $scope.canEdit == true){
                          output.sessions[session].title = output.sessions[session].studioName
                      }
                      //
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
            $scope.session= {}
            //if logged in user is the profile name, they can edit

            $scope.isLoading=false;

        });
    }

        // $scope.getSessions = function() {
        //     //get sessions from user _id for the calendar to use
        //     SessionsFactory.getSessions({User: $scope.profile._id},  function(output) {
        //         //if studio set min and max to set schedule times
        //
        //     })
        // }


    $scope.logOut = function(){
      auth.logOut()
    }

    	//add sessions
	$scope.requestDates = function() {
		if ($scope.session.startHour == null || $scope.session.endHour == null) {
			$scope.fail = true;
            return
		} else if ($scope.session.startDate instanceof Date == false || $scope.session.endDate instanceof Date == false){
            $scope.notDate = true;
            return
        }
		else {
			$scope.fail = false;

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
                artist: $scope.currentUser.username,
                studio: $scope.profile._id,
                addedBy: $scope.currentUser.username,
                title: $scope.currentUser.username,
                studioName: $scope.profile.username
            };

            if ($scope.canEdit == true){
                session.artist = $scope.session.artist;
                session.title = session.artist
            }
            console.log(session)
            //check to make usre it's valid and doesn't already exist from the studio
			SessionsFactory.checkSession(session, function(output){
				if (output === "exists") {
					$scope.existsFail = true;
                    return
				} else if (output === "invalid") {
                    $scope.invalid = true;
                    return
                }
                 else {
					$scope.existsFail = false;
                    $scope.invalid = false;
                    var session = output
                    if($scope.canEdit == true) {
                        console.log(session)
                        SessionsFactory.SelfAddSession(session, function(output){
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
                              // here we send it to the

                            }, function () {
                                // $scope.successAdd = false
                                $scope.getSessions()
                                $scope.session = {}
                              });
                        })
                }
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
    $scope.addRating = function(){
        console.log($scope.profile.ratings)
    }

    $scope.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

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


$scope.editEvent = function(event) {
    if($scope.canEdit == true || event.addedBy == $scope.currentUser.username){
        console.log(event)
    }
}


//only be able to delete events if you can edit(self profile)
    $scope.deleteEvent = function(event){
        if ($scope.canEdit == true || event.addedBy == $scope.currentUser.username) {
            SessionsFactory.deleteSession(event, {id: $scope.profile._id}, function(output){
                $scope.events = output
                console.log($scope.events)
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
