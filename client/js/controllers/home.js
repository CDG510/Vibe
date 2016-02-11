vibe.controller("HomeController", function ($scope, $location, $routeParams, $document, $window, $anchorScroll, $uibModal, $log) {


// figure out how to animate the nav bar and make the collapsible menu nav bar thing
$scope.showlist = false
$scope.findStudioSearch = function() {
	console.log($scope.studioSearch)
	$location.path('/artists').search({search: $scope.studioSearch});

}

 $scope.status = {
    isopen: false
  };

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

            modalInstance.result.then(function (studioForm) {
                $scope.newStudio = studioForm;
                console.log($scope.newStudio, "after promise/result")
                $scope.successAdd = true
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                $scope.successAdd = false
              });
        };

        $scope.showLinks = function() {
        	console.log('open da list')
        	$scope.showlist = true
        }

  
$scope.scrollTo = function(id) {
      var thisLocation = $location.hash(id);
      var someElement = angular.element(document.getElementById(id));
      console.log(thisLocation)
      console.log(someElement)
    $document.scrollToElementAnimated(someElement);
      // $anchorScroll();
   }
$scope.appendToEl = angular.element(document.querySelector('#toggleButton'))

   $(window).on("resize.doResize", _.throttle(function (){
            console.log(window.innerWidth);
            if (window.innerWidth > 768) {
            	$scope.isopen = false
            }
            // $scope.$apply(function(){
            //    //do something to update current scope based on the new innerWidth and let angular update the view.
            // });
        },100));
});