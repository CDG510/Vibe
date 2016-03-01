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
        }
    });

    // $scope.Schedule = [
    //     {name: "monday", value: 0},
    //     {name: 'tuesday', value: 1},
    //     {name: "wednesday" value: 2},
    //     {name: "thursday" value: 3},
    //     {name: "friday" , value: 4},
    //     {name: "saturday", value: 5},
    //     {name: "sunday", value: 6}
    // ]
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
                    console.log(output)
                    $scope.newStudio = output
                    });
            } else {
            var momentStart = moment($scope.newStudio.schedule.startHour).format("LT")
            var momentEnd = moment($scope.newStudio.schedule.endHour).format("LT")
            $scope.newStudio.schedule.formatTime = momentStart;
            $scope.newStudio.schedule.formatEnd = momentEnd;
            // angular.forEach($scope.checkModel, function (value, key) {
            //     $scope.newStudio.schedule.daysOff = [];
            //      if (value) {
            //        $scope.newStudio.schedule.daysOff.push(key);
            //        console.log($scope.newStudio.schedule);
            //      }
            //    });
            // for(var key in $scope.newStudio.schedule.days) {
            //     $scope.newStudio.schedule.daysOff = [];
            //     if ($scope.newStudio.schedule.days[key]){
            //         $scope.newStudio.schedule.daysOff.push($scope.newStudio.schedule.days[key])
            //         console.log($scope.newStudio.schedule.daysOff)
            //     }
            // }
            $scope.newStudio.id = $scope.currentUser._id;
            usersFactory.updateUser($scope.newStudio, function(output) {
                    console.log(output)
                    $scope.newStudio = output
                });
            }
            $uibModalInstance.close($scope.newStudio);

        } else {
            console.log('userform is not in scope');
        }
    };

    //dismiss modal
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
