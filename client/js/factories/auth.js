vibe.factory('auth', function($http, $window, $rootScope){
	var auth = {};

	auth.saveToken = function(token){
		$window.localStorage["vibe-token"] = token;
	}

	auth.getToken = function(){
		return $window.localStorage['vibe-token'];
	}

	auth.isLoggedIn = function() {
		var token = auth.getToken();

		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			return false
		}
	}

	auth.currentUser = function(){
		if(auth.isLoggedIn()){
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			console.log(payload);
			return payload;
		}
	}

	auth.register = function(user){
		return $http.post('/register', user).success(function(data){
			auth.saveToken(data.token)

			// $rootScope.$broadcast('currentUser', {user: data.user})
			// $rootScope.$emit('currentUser', {user: data.user})
		});
	};

	auth.logIn = function(user, callback){
		return $http.post('/loginUser', user).success(function(data){
		// $rootScope.$broadcast('currentUser', {user: data.user})
		// $rootScope.$emit('currentUser', {user: data.user})
		auth.saveToken(data.token);
		

			// return user
		})
	}

	auth.logOut = function(){
		$window.localStorage.removeItem('vibe-token')
	}

	return auth;
})