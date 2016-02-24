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

		factory.addSession = function(requestedSession , callback){
			if (Sessions.length > 0) {
				for (session in Sessions) {
				//if requested session is after an exisiting start time & before an exisiting endTime (aka during)
				//parse existing times and requested dates for comparison
					var existingParsedStart = ParseIt(Sessions[session].startsAt)
					var existingParsedEnd = ParseIt(Sessions[session].endsAt)
					//can't start& end during an existing session
					if (requestedSession.startTime >= existingParsedStart && requestedSession.endTime < existingParsedEnd) {
						//show callbacka failure
						callback("exists")
						return
					}
					//can't start during and end after an existing
					if (requestedSession.startTime >= existingParsedStart && requestedSession.endTime >= existingParsedEnd) {
						callback("exists");
						return
					}
					//can't run into an existing session (overlap into it)
					if  (requestedSession.startTime < existingParsedStart && requestedSession.endTime > existingParsedStart) {
						callback("exists");
						return
					}
					//can't overtake an existing one
					if (requestedSession.startTime <= existingParsedStart && requestedSession.endTime >= existingParsedEnd) {
						callback("exists");
						return
					}
				//other checks
				}
			}
			
			$http.post("/addSession", requestedSession).success(function(output) {
				callback(output)
			})
		}

		



		return factory
	});