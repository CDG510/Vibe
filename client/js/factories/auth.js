vibe.factory('auth', function($http, $window){
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

			return payload.username;
		}
	}

	auth.register = function(user){
		console.log('bout to register', user)
		if (user.preference = "artist") {
			return $http.post('/registerArtist', user).success(function(data){
			auth.saveToken(data.token)
		});
		}
		else {
			return $http.post('/registerStudio', user).success(function(data){
			auth.saveToken(data.token)
		});
		}
		
	};

	auth.logInzdtudio = function(user){
		return $http.post('/loginStudio', user).success(function(data){
			auth.saveToken(data.token);
		})
	}

	auth.logOut = function(){
		$window.localStorage.removeItem('vibe-token')
	}

	return auth;
})