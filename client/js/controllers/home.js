vibe.controller("HomeController", function ($scope, $location, $routeParams, $document, $window, $anchorScroll, $uibModal, $log) {


// figure out how to animate the nav bar and make the collapsible menu nav bar thing

$scope.findStudioSearch = function() {
	console.log($scope.studioSearch)
	$location.path('/artists').search({search: $scope.studioSearch});

}

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

  
$scope.scrollTo = function(id) {
      var thisLocation = $location.hash(id);
      var someElement = angular.element(document.getElementById(id));
      console.log(thisLocation)
      console.log(someElement)
    $document.scrollToElementAnimated(someElement);
      // $anchorScroll();
   }
// function collapseNavbar() {
//     if ($(".navbar").offset().top > 50) {
//         $(".navbar-fixed-top").addClass("top-nav-collapse");
//     } else {
//         $(".navbar-fixed-top").removeClass("top-nav-collapse");
//     }
// }

// $(window).scroll(collapseNavbar);
// $(document).ready(collapseNavbar);
});