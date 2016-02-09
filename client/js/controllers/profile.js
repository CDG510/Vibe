// vibe.controller('ProfilesController', function ($scope, $location, $routeParams, MusiciansFactory, StudiosFactory, $log, SessionsFactory) {


// 	$scope.fail = false;
// 	console.log($routeParams);
// 	$scope.profile = $routeParams
// 	// $scope.rating = $scope.profile.rating
// 	// console.log($scope.rating)
//  //  console.log($scope.profile._id)

// 	$scope.calendar = false;
// 	$scope.success = true;


// 	$scope.openSchedule = function(){
// 		console.log('show me the calendar!')
// 		$scope.calendar = true;
//     SessionsFactory.getSessions({studio: $scope.profile._id},  function(output) {
//       //this output will populate the schedule table
//       console.log(output)
//     });
// 	}

// 	$scope.requestDates = function(){

// 		if ($scope.session.start == null || $scope.session.end == null) {
// 			console.log('NAH BRUH')
// 			console.log('start time' , $scope.session.date  , "time of start" ,  $scope.session.start , "end time" ,  $scope.session.end);
// 			$scope.fail = true;
// 		}

// 		else {
// 			$scope.fail = false;
// 			console.log('YEE BUDDY')
// 			console.log('start time' , $scope.session.date  , "time of start" ,  $scope.session.start , "end time" ,  $scope.session.end, "info" ,  $scope.session.info, 'artist' , $scope.session.artist);
// 				$scope.success = true;
// 				session = {date: $scope.session.date, startTime:  $scope.session.start, endTime: $scope.session.end, info: $scope.session.info, artist: $scope.session.artist, studio: $scope.profile._id};
// 				console.log(session);
// 				SessionsFactory.addSession(session, function(output){
// 					console.log(output)
// 				}) 
// 				$scope.session = {};
// 		}
// 	}


// 	  $scope.today = function() {
//     $scope.firstDate = new Date();
//   };
//   $scope.today();

//   $scope.clear = function () {
//     $scope.firstDate = null;
//   };

//   // Disable weekend selection
//   $scope.disabled = function(date, mode) {
//     return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
//   };

//   $scope.toggleMin = function() {
//     $scope.minDate = $scope.minDate ? null : new Date();
//   };
//   $scope.toggleMin();
//   $scope.maxDate = new Date(2020, 5, 22);

//   $scope.open1 = function($event) {
//     $scope.status.opened1 = true;
//   };

//   // $scope.open2 = function($event) {
//   //   $scope.status.opened2 = true;
//   // };

//   $scope.setDate = function(year, month, day) {
//     $scope.firstDate = new Date(year, month, day);
//   };

//   $scope.dateOptions = {
//     formatYear: 'yy',
//     startingDay: 1
//   };

//   $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
//   $scope.format = $scope.formats[0];

//   $scope.status = {
//     opened: false
//   };

//   var tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   var afterTomorrow = new Date();
//   afterTomorrow.setDate(tomorrow.getDate() + 2);
//   $scope.events =
//     [
//       {
//         date: tomorrow,
//         status: 'full'
//       },
//       {
//         date: afterTomorrow,
//         status: 'partially'
//       }
//     ];

//   $scope.getDayClass = function(date, mode) {
//     if (mode === 'day') {
//       var dayToCheck = new Date(date).setHours(0,0,0,0);

//       for (var i=0;i<$scope.events.length;i++){
//         var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

//         if (dayToCheck === currentDay) {
//           return $scope.events[i].status;
//         }
//       }
//     }

//     return '';
//   };

//   $scope.mytime = new Date();

//   $scope.hstep = 1;
//   $scope.mstep = 30;

//    $scope.ismeridian = true;

//   $scope.toggleMode = function() {
//     $scope.ismeridian = ! $scope.ismeridian;
//   };


// })