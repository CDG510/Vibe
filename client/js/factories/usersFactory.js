vibe.factory("usersFactory", function ($http) {

	var factory = {}


	factory.updateUser = function(user, callback){
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
			console.log(output, "WE GOT DIS BACK");
			callback(output);
		})
		.error(function(){
			$scope.failure = true
		})
		;
	}



	//function to message a studio



	return factory



});
