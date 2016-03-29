vibe.controller("EditPageController", function($scope, StudiosFactory, auth, $routeParams, usersFactory, DatesFactory, $location){

  $scope.isLoggedIn = auth.isLoggedIn;
  var clearKey = {key: null}
  $scope.logOut = function(){
    auth.logOut()
    $location.path("/").search(clearKey)
  }
  
  if ($routeParams.session) {
      $scope.session = $routeParams.session
  }

  //if page and logged in is true
  if ($routeParams.id && $scope.isLoggedIn != false) {
  usersFactory.getUserByName({username: $routeParams.id}, function(output) {
      $scope.currentUser = output
      $scope.newStudio = $scope.currentUser;
      //if there is no profiletype yet
       if ($scope.currentUser.profileType == undefined || $scope.currentUser.profileType== ""){
      } else if ($scope.currentUser.profileType == "Studio") {
          //if is studio, set the offdays
          $scope.isStudio = true;
          //if no offdays setup the offdays
          if (!$scope.newStudio.schedule.offDays){
              $scope.newStudio.schedule.offDays = [{
                  noWork: false
              }]
              //reset the parsed time to to a useable date
          var userStartTime = new Date($scope.currentUser.schedule.startHour)
          var userEndTime = new Date($scope.currentUser.schedule.endHour)
          $scope.newStudio.schedule.endHour = userEndTime
          $scope.newStudio.schedule.startHour = userStartTime
          } else {
              ///otherwise, loop through the days, check what there is and set them
              for(var i = 0; i < $scope.newStudio.schedule.offDays.length; i++){
                  if ($scope.newStudio.schedule.offDays[i].noWork === false){
                      $scope.newStudio.schedule.offDays.splice(i, i+1)
                  }
              }
          }
          //if no pictures in gallery, make an empty placeholder
          if(!$scope.newStudio.gallery){
              $scope.newStudio.gallery = []
          }
      }
  });
}
//schedule values
  $scope.Schedule = [
      {name: "monday", value: 1},
      {name: 'tuesday', value: 2},
      {name: "wednesday", value: 3},
      {name: "thursday", value: 4},
      {name: "friday" , value: 5},
      {name: "saturday", value: 6},
      {name: "sunday", value: 0}
  ]
  // trigger preference to show additional input fields
  $scope.setAsStudio = function() {
      $scope.newStudio.profileType = "Studio";
      $scope.isStudio = true;
      if (!$scope.newStudio.schedule) {
          $scope.newStudio.schedule = {}
      }
      if (!$scope.newStudio.schedule.offDays){
          $scope.newStudio.schedule.offDays = [{
              noWork: false
          }]
  }
}

//trigger preference, don't show studio options> This will determine what other options appear in profile page
$scope.setAsArtist = function() {
  $scope.newStudio.profileType = "Artist"
  $scope.newStudio.schedule = {};
  $scope.newStudio.ratings = [];
  $scope.newStudio.price = 0
  $scope.newStudio.businessName = ""
  $scope.isStudio = false;
}

  //add input field
  $scope.addNewMember = function() {
      $scope.newStudio.members.push('');
  }
  //remove members input field
  $scope.removeMember = function(z){
      $scope.newStudio.members.splice(z, 1);
  }
  //add input field for media website
  $scope.addNewWebsite = function() {
      $scope.newStudio.websites.push({
          url: ""
      });
  }
  //remove input field for media website
  $scope.removeWebsite = function(z){
      $scope.newStudio.websites.splice(z, 1);
  }

  $scope.addNewDayOff = function(){
      $scope.newStudio.schedule.offDays.push({noWork: true});
  };

  $scope.removeDayOff = function(){
      $scope.newStudio.schedule.offDays.splice($scope.newStudio.schedule.offDays.length-1, 1);
  }

  $scope.addToGallery = function(){
      $scope.newStudio.gallery.push("")
  };

  $scope.removeFromGallery = function(z){
      $scope.newStudio.gallery.splice(z, 1);
  }

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
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



//to setup the updated info
  $scope.submitForm = function () {

      if ($scope.newStudio.profileImage){
        $scope.newStudio.profileImage = $scope.newStudio.profileImage.toString()
      }
      //set the form to current user...
         $scope.newStudio.id = $scope.currentUser._id;
          if ($scope.newStudio.profileType == "Artist") {
              usersFactory.updateUser($scope.newStudio, function(output) {
                  $scope.newStudio = output
                  });
          } else {
          for (var i =0; i <= 7; i++){
              //for any values not set, set them to a non-valid value so they don't get registered by calendar
              if (!$scope.newStudio.schedule.offDays[i]){
                  $scope.newStudio.schedule.offDays.push({});
                  $scope.newStudio.schedule.offDays[i].value = 10;
                  $scope.newStudio.schedule.offDays[i].noWork = false;
              }
          }
          console.log($scope.newStudio)
          //actually go update finally
          usersFactory.updateUser($scope.newStudio, function(output) {
                  $scope.newStudio = output
              });
          }
          //return to profile
          $location.path('/profile/'+$routeParams.id).search(clearKey);
        }



})
