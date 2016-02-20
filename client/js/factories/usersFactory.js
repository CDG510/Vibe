vibe.factory("usersFactory", function ($http) {

	var factory = {}

	// //function to find searched studios
	// factory.searchStudios = function(search, callback) {
	// 	console.log("in the factory with", search)
	// 	// api call to DB for search results would go here
	// 	callback(search)
	// 	// callback should really be using DB results
	// };

	//function to add studios of interest
	factory.addUser = function(studio, callback) {
        console.log(studio, "got to the factory, off to routing and passport")
		$http.get("/auth/facebook/callback", studio, function(output) {
            callback(output);
        } )
	};

	// factory.addStudioUser = function(studio, callback) {
	// 	callback(studio)
	// }

	//function to add a recording session

	//function to message a studio

	//for maps


	return factory



});
