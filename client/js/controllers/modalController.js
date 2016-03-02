vibe.controller("ModalInstanceCtrl", function ($scope, $uibModalInstance, newStudio, StudiosFactory, auth, usersFactory, DatesFactory) {

    $scope.isLoggedIn = auth.isLoggedIn();
    var user = auth.currentUser()
    user.User = user._id

    usersFactory.getUserInfo(user, function(output){
        $scope.currentUser = output
        $scope.newStudio = $scope.currentUser;
         if ($scope.currentUser.profileType == undefined){
            console.log("CHOOSE YOUR PATH" , $scope.currentUser)
        } else if ($scope.currentUser.profileType == "Studio") {
            $scope.isStudio = true;
            console.log($scope.newStudio.schedule)
            var userStartTime = new Date($scope.currentUser.schedule.startHour)
            var userEndTime = new Date($scope.currentUser.schedule.endHour)
            $scope.newStudio.schedule.endHour = userEndTime
            $scope.newStudio.schedule.startHour = userStartTime
            if (!$scope.newStudio.schedule.offDays){
                $scope.newStudio.schedule.offDays = [{
                    noWork: false
                }]

            } else {
                for(var i = 0; i < $scope.newStudio.schedule.offDays.length; i++){
                    if ($scope.newStudio.schedule.offDays[i].noWork === false){
                        $scope.newStudio.schedule.offDays.splice(i, i+1)
                    }
                }
            }
            
                // $scope.newStudio.schedule.offDays.splice(7, 9);


            
        }
    });

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
        console.log($scope.newStudio)
    }
    //remove members input field
    $scope.removeMember = function(z){
        $scope.newStudio.members.splice(z, 1);
    }
    //add input field for media website
    $scope.addNewWebsite = function() {
        $scope.newStudio.websites.push('');
        console.log($scope.newStudio)
        // console.log($scope.newStudio.members, "just !")
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

    // $scope.form = {}
    //submit info, return to original page
    $scope.submitForm = function () {
        if ($scope.form.newStudio.$valid) {
            //repackage data for easier DBencoding
            //get reformat date into hours
            $scope.newStudio.profileImage = $scope.newStudio.profileImage.toString()

            if ($scope.newStudio.profileType == "Artist") {
                $scope.newStudio.id = $scope.currentUser._id;
                usersFactory.updateUser($scope.newStudio, function(output) {
                    $scope.newStudio = output
                    });
            } else {
            var momentStart = moment($scope.newStudio.schedule.startHour).format("LT")
            var momentEnd = moment($scope.newStudio.schedule.endHour).format("LT")
            $scope.newStudio.schedule.formatTime = momentStart;
            $scope.newStudio.schedule.formatEnd = momentEnd;

            $scope.newStudio.id = $scope.currentUser._id;

            for (var i =0; i <= 7; i++){
                // console.log($scope.newStudio.schedule.offDays[i])
                if (!$scope.newStudio.schedule.offDays[i]){
                    $scope.newStudio.schedule.offDays.push({});
                    $scope.newStudio.schedule.offDays[i].value = 10;
                    $scope.newStudio.schedule.offDays[i].noWork = false;
                } 
                console.log($scope.newStudio.schedule.offDays[i])
            }

            usersFactory.updateUser($scope.newStudio, function(output) {
                    $scope.newStudio = output
                });
            console.log($scope.newStudio)
            }

            $uibModalInstance.close($scope.newStudio);
        }
        else {
            console.log('userform is not in scope');
        }
    };

    //dismiss modal
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
