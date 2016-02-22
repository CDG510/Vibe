vibe.factory("StudiosFactory", function ($http) {

	var factory = {}

	//function to find searched studios
	factory.searchStudios = function(search, callback) {
		// api call to DB for search results would go here
		$http.post('/findStudios', search).success(function(output){
			 	callback(output);
			 })
		// callback should really be using DB results
	};

	factory.findStudios = function (search, callback){
			
			 $http.post('/findStudios', search).success(function(output){
			
			 	callback(output);
			 })
		}

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