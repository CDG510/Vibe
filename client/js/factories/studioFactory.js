vibe.factory("StudiosFactory", function ($http) {

	var factory = {}

	//function to find searched studios
	factory.findStudios = function(search, callback) {
		callback(search)
		// $http.get("#", search)
	};

	//function to add studios of interest
	factory.addStudios = function(studio, callback) {
		$http.get("#", studio )
	};

	factory.addStudioUser = function(studio, callback) {
		callback(studio)
	}

	//function to add a recording session

	//function to message a studio

	//for maps


	return factory



});