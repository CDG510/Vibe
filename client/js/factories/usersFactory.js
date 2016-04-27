vibe.factory("usersFactory", function ($http) {

	var factory = {}

	factory.updateUser = function(user, callback){
		console.log(user);
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

	factory.getUserInfo = function(user, callback){
		$http.post("/getUserInfo", user)
		.success(function(output){
			callback(output);
		})
		.error(function(){
			$scope.failure = true
		})
		;
	}

	return factory

});
