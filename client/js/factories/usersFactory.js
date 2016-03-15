vibe.factory("usersFactory", function ($http) {

	var factory = {}


	factory.updateUser = function(user, callback){
		console.log(user, "is going to the db")
		$http.post("/updateProfile", user).success(function(output){
			callback(output)
		})
	}

	factory.getUserByName = function(user, callback){
		$http.post("/findUser", user)
		.success(function(output){
			callback(output)
		})
		.error(function(){
		})
		;
	}
	factory.getUserPromise = function(user){
		$http.post("/findUser", user).success(function(user){
			return user
		})
	}



	factory.getUserInfo = function(user, callback){
		$http.post("/getUserInfo", user)
		.success(function(output){
			console.log(output, "WE GOT DIS BACK");
			callback(output);
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
