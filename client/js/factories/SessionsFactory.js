vibe.factory('SessionsFactory', function ($http) {
		var Sessions = [];
		var factory = {};

		function ParseIt (parsed) {
	var parsed = parsed.getTime();
	return parsed
}

		factory.getSessions = function(id, callback) {
			$http.post("/getSessions", id).success(function(output) {
				Sessions = output.sessions;
				callback(output);
			})
		}

		factory.addSession = function(info , callback){
			for (session in Sessions) {
				//if requested session is after an exisiting start time & before an exisiting endTime (aka during)
				var newStartHour = ParseIt(Sessions[session].startsAt)
				var newEndHour = ParseIt(Sessions[session].endsAt)
				if (info.startTime >= newStartHour && info.endTime < newEndHour) {
					//show callbacka failure
					callback("exists")
					return
				}
				//if a session is scheduled to end after another to star
				if (info.endTime > newStartHour && info.startTime < newEndHour) {
					callback("exists");
					return
				}
				//other checks
			}
			$http.post("/addSession", info).success(function(output) {
				callback(output)
			})
		}

		



		return factory
	});