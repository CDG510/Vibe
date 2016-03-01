vibe.factory("usersFactory", function ($http) {

	var factory = {}


	factory.updateUser = function(user, callback){
		console.log(user, "is going to the db")
		$http.post("/updateProfile", user).success(function(output){
			callback(output)
		})
	}

	factory.getUserInfo = function(user, callback){
		console.log(user, "needs mo info")
		$http.post("/getUserInfo", user)
		.success(function(output){
			console.log(output, "WE GOT DIS BACK");
			callback(output);
			console.log("send it....")
		})
		.error(function(){
			$scope.failure = true
		})
		;
	}


	// factory.deleteUser = function(user, callback){
	// 	console.log(user, "is getting removed")
	// 	$http.post("/deleteProfile", user)
	// }


	//function to message a studio



	return factory



});
