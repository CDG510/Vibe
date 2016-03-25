vibe.factory('SessionsFactory', function ($http) {
		var Sessions = [];
		var factory = {};
		Studios = []
		var ParseIt = function  (parsed) {
			parsed = parsed.getTime();
		return parsed
	}
		//get all sessions by current profile
		factory.getSessions = function(id, callback) {
			console.log('getting dem sessions')
			$http.post("/getSessions", id).success(function(output) {
				Sessions = output.sessions;
				callback(output);
			})
		}

		factory.setSessions = function(sessions){
			Sessions = sessions;
			console.log(Sessions)

		}
		//
		// factory.getStudioFromSession = function(id, callback){
		// 	console.log('checking sessions with', id)
		// 	$http.post('/findStudiobySession', output) {
		// 		Studios = output
		// 		callback(ouput)
		// 	}
		// }

		factory.checkSession = function(requestedSession, callback){
			var today = new Date()
			var newtoday = ParseIt(today)
			console.log('begin the checks!', requestedSession, 'against', Sessions)
			if (requestedSession.endTime <= requestedSession.startTime ) {
				// console.log(requestedSession, existingParsedStart,existingParsedEnd,  "can't overtake an existing one, ends after an existing end" )
				callback("invalidDate");
				return
			}
			if (requestedSession.startTime <= newtoday  || requestedSession.endTime <= newtoday){
				callback('invalidStart');
				return
			}

			if (Sessions.length == 0){
				console.log('lol only one, and it passed')
				callback(requestedSession)
			} else {
				for (session in Sessions) {
					console.log(Sessions[session])
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
					if (requestedSession.startTime >= existingParsedStart && requestedSession.startTime < existingParsedEnd  && requestedSession.endTime >= existingParsedEnd) {
						callback("exists");
						return
					}
					//can't run into an existing session (overlap into it)
					if  (requestedSession.startTime < existingParsedStart && requestedSession.endTime > existingParsedStart) {
						callback("exists");
						return
					}
					//can't have a date invalid date

					//can't have a date that is before today
				//other checks
				}
				callback(requestedSession)
			}
		}

		//add session function with checks to see if it doesn't already exist
		factory.addSession = function(requestedSession , callback){
			//if all passes, then take it to the db to add
			$http.post("/addSession", requestedSession).success(function(output) {
						Sessions.push(output)
						callback(Sessions)
			})
		}

		factory.SelfAddSession = function(requestedSession , callback){
			//if all passes, then take it to the db to add
			$http.post("/selfAddSession", requestedSession).success(function(output) {
				if (Sessions.length === 0) {
						Sessions.push(output)
						callback(Sessions)
				} else {
					Sessions.push(requestedSession)
					callback(Sessions)
				}
			})
		}

		factory.deleteSession = function(event, user, callback ){
			var info = {
				event: event,
				user: user
			}
			$http.post('/deleteSession', info).success(function(){
				var elementPos = Sessions.map(function(x) {return x._id; }).indexOf(event._id);
				Sessions.splice(elementPos, 1)
				callback(Sessions)
			})
		}

		factory.updateSession = function(event, callback){
			$http.post("/updateSession", event).success(function(output){
				callback(output);
			});
		}

		return factory
	});
