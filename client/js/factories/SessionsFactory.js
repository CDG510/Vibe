vibe.factory('SessionsFactory', function ($http) {
		var Sessions = [];
		var factory = {};
		// function dateParse (date) {

		// }

		function ParseIt (parsed) {
	console.log(parsed, "is what i'm bouto fuckup with")
	var parsed = parsed.getTime();
	console.log(parsed, "was parsed")
	
	return parsed
}

		factory.getSessions = function(id, callback) {
			console.log("going to get studio sessions with", id)
			$http.post("/getSessions", id).success(function(output) {
				console.log(output)
				Sessions = output.sessions;
				callback(output);
			})
		}

		factory.addSession = function(info , callback){
			console.log(info);
			for (session in Sessions) {
				//if requested session is after an exisiting start time & before an exisiting endTime (aka during)
				console.log(session, Sessions[session])
				var newStartHour = ParseIt(Sessions[session].startsAt)
				var newEndHour = ParseIt(Sessions[session].endsAt)
				console.log(info.startTime, info.endTime, newStartHour, newEndHour, "are getting compared")
				if (info.startTime >= newStartHour && info.endTime < newEndHour) {
					//show callbacka failure
					console.log("WE HAVE FAILED")
					callback("exists")
					return
				}
				//if a session is scheduled to end after another to star
				if (info.endTime > newStartHour && info.startTime < newEndHour) {
					console.log("WE FAILED AGAIN");
					callback("exists");
					return
				}
				//other checks
			}
			console.log('this shouldnt do anything ')
			$http.post("/addSession", info).success(function(output) {
				console.log(output)
				callback(output)
			})
		}

		



		return factory
	});