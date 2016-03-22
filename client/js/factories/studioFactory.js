vibe.factory("StudiosFactory", function ($http) {

	var factory = {}

	//function to find searched studios, from mainpage
	factory.findStudiosAdvanced = function(search, callback) {
		// api call to DB for search results would go here
		$http.post('/findStudios', search).success(function(output){
			 	callback(output);
			 })
		// callback should really be using DB results
	};

	factory.findStudiosSimple = function (search, callback){
			 $http.post('/findStudiosSimple', search).success(function(output){
			 	callback(output);
			 })
		}

	return factory

});
