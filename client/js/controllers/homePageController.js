vibe.controller("HomeController", function ($scope, $location, $routeParams, $document, $window, $anchorScroll, $uibModal, $log, StudiosFactory) {


// figure out how to animate the nav bar and make the collapsible menu nav bar thing
// $scope.findStudioSearch = function() {
// 	console.log($scope.studioSearch)
// 	$location.path('/artists').search({search: $scope.studioSearch});

// }
$scope.failSearch = false;
//
$scope.dropDown = true;

//function for studio search
$scope.searchStudios = function() {
    //go to factory, to api call, get results, transfer to next partial
    console.log($scope.studioSearch)
    if ($scope.studioSearch == undefined) {
        //show fail message
        $scope.failSearch = true
        return
    } else {
        $scope.failSearch = false;
    StudiosFactory.searchStudios({location: $scope.studioSearch.searchTerm}, function(output){
        console.log(output)
        $location.path('/searchRequest').search({studioSearch: output, searchTerm: $scope.studioSearch.searchTerm});
    })
     
    }
   

}

//function to load modals
$scope.showForm = function () {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);
   
            var modalInstance = $uibModal.open({
                templateUrl: 'static/partials/AddStudioTemplate.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
                resolve: {
                    newStudio: function () {
                    	console.log($scope.newStudio, "back to original controlla")
                        return $scope.newStudio;
                    }
                }
            });

            //on return
            modalInstance.result.then(function (studioForm) {
                $scope.newStudio = studioForm;
                console.log($scope.newStudio, "after promise/result")
                $scope.successAdd = true
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                $scope.successAdd = false
              });
        };

    // $scope.showLinks = function() {
    // 	console.log('open da list')
    // 	$scope.showlist = true
    // }

  //function to scroll to div
    $scope.scrollTo = function(id) {
          var thisLocation = $location.hash(id);
          var someElement = angular.element(document.getElementById(id));
          console.log(thisLocation)
          console.log(someElement)
        $document.scrollToElementAnimated(someElement);
       }
    $scope.appendToEl = angular.element(document.querySelector('#toggleButton'))

//this monitors windows size
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