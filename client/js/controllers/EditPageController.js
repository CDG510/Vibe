vibe.controller("EditPageController", function($scope, StudiosFactory, auth, $routeParams, usersFactory, DatesFactory, $location){

console.log($routeParams)
  $scope.isLoggedIn = auth.isLoggedIn;
  // var user = auth.currentUser()
  // user.User = user._id
  // console.log(user)
  $scope.dropDown = true;
  var clearKey = {key: null}


  if ($routeParams.id){
    console.log('ayeeee')
  usersFactory.getUserByName({username: $routeParams.id}, function(output){
    console.log(output)
      $scope.currentUser = output
      $scope.newStudio = $scope.currentUser;
       if ($scope.currentUser.profileType == undefined || $scope.currentUser.profileType== ""){
      } else if ($scope.currentUser.profileType === "Studio") {
          $scope.isStudio = true;
          if (!$scope.newStudio.schedule.offDays){
              $scope.newStudio.schedule.offDays = [{
                  noWork: false
              }]
          var userStartTime = new Date($scope.currentUser.schedule.startHour)
          var userEndTime = new Date($scope.currentUser.schedule.endHour)
          $scope.newStudio.schedule.endHour = userEndTime
          $scope.newStudio.schedule.startHour = userStartTime
          } else {
              for(var i = 0; i < $scope.newStudio.schedule.offDays.length; i++){
                  if ($scope.newStudio.schedule.offDays[i].noWork === false){
                      $scope.newStudio.schedule.offDays.splice(i, i+1)
                  }
              }
          }
      }
  });
}

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
  console.log('artist inputs yeeee', $scope.newStudio)
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
      console.log($scope.newStudio.schedule);
  };

  $scope.removeDayOff = function(){

      $scope.newStudio.schedule.offDays.splice($scope.newStudio.schedule.offDays.length-1, 1);
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

  // $scope.form = {}
  //submit info, return to original page
  $scope.submitForm = function () {
      if ($scope.form.newStudio.$valid) {
          //repackage data for easier DBencoding
          //get reformat date into hours
          if ($scope.newStudio.profileImage){
            $scope.newStudio.profileImage = $scope.newStudio.profileImage.toString()
          }
          $scope.newStudio.id = $scope.currentUser._id;


          if ($scope.newStudio.profileType == "Artist") {
              usersFactory.updateUser($scope.newStudio, function(output) {
                  $scope.newStudio = output
                  });
          } else {
          for (var i =0; i <= 7; i++){
              // console.log($scope.newStudio.schedule.offDays[i])
              if (!$scope.newStudio.schedule.offDays[i]){
                  $scope.newStudio.schedule.offDays.push({});
                  $scope.newStudio.schedule.offDays[i].value = 10;
                  $scope.newStudio.schedule.offDays[i].noWork = false;
              }
          }

          usersFactory.updateUser($scope.newStudio, function(output) {
                  $scope.newStudio = output
              });
          }

          $location.path('/profile/'+$routeParams.id).search(clearKey);      }
      else {
          console.log('userform is not in scope');
          $scope.redo=  true;
      }
  };

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

})