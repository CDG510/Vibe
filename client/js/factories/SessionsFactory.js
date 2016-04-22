vibe.factory('SessionsFactory', function ($http) {
		var Sessions = [];
		var factory = {};
		var user = {}

		var paySession = {}

		function ParseIt (parsed) {
		var parsed = parsed.getTime();
		return parsed
	}
		//get all sessions by current profile
		factory.getSessions = function(id, callback) {
			console.log('getting dem sessions')
			$http.post("/getSessions", id).success(function(output) {
				console.log("got back",  output)
				Sessions = output.sessions;
				callback(output);
			})
		}


		factory.checkSession = function(requestedSession, callback){
			var today = new Date()
			var newtoday = ParseIt(today)
				for (session in Sessions) {
				//if requested session is after an exisiting start time & before an exisiting endTime (aka during)
				//parse existing times and requested dates for comparison
					var existingParsedStart = ParseIt(Sessions[session].startsAt)
					var existingParsedEnd = ParseIt(Sessions[session].endsAt)

					//can't start& end during an existing session
					if (requestedSession.startTime >= existingParsedStart && requestedSession.endTime < existingParsedEnd) {
						//show callbacka failure
						console.log(requestedSession,  existingParsedStart, existingParsedEnd, "start overlap existing & end before existing end")
						callback("exists")
						return
					}
					//can't start during and end after an existing
					if (requestedSession.startTime >= existingParsedStart && requestedSession.startTime < existingParsedEnd  && requestedSession.endTime >= existingParsedEnd) {
						console.log(requestedSession, existingParsedStart, existingParsedEnd,  " can't start during and end after an existing")
						callback("exists");
						return
					}
					//can't run into an existing session (overlap into it)
					if  (requestedSession.startTime < existingParsedStart && requestedSession.endTime > existingParsedStart) {
						console.log(requestedSession, existingParsedStart, existingParsedEnd, "can't run into an existing session (overlap into it)")
						callback("exists");
						return
					}
					//can't overtake an existing one
					if (requestedSession.endTime <= requestedSession.startTime) {
						// console.log(requestedSession, existingParsedStart,existingParsedEnd,  "can't overtake an existing one, ends after an existing end" )
						callback("invalid");
						return
					}

					if (requestedSession.startTime < newtoday  || requestedSession.endTime< newtoday){
						callback('invalid');
						return
					}
				//other checks
				}
				callback(requestedSession)

			}






		//add session function with checks to see if it doesn't already exist
		factory.addSession = function(requestedSession , callback){
			//if all passes, then take it to the db to add
			$http.post("/addSession", requestedSession).success(function(output) {
				console.log("back from the db", output)
				if (Sessions.length === 0) {
						Sessions.push(output)
						callback(output)
				} else {
					Sessions.push(requestedSession)
					console.log(Sessions)
					callback(Sessions)
				}

			})
		}

		factory.deleteSession = function(event, user, callback ){
			console.log(event, user);
			var info = {
				event: event,
				user: user
			}
			$http.post('/deleteSession', info).success(function(output){
			console.log(output)
			Sessions.slice(Sessions.length-1, 1)
			callback(output)
		})
		}


		factory.checkoutSession = function(info){
			console.log(info)
			paySession = info.session;
			var user = info.studio;
			$http.post('/holdSession', {studio: user, session: paySession})
		}

		factory.payForSession = function(callback) {
			$http.get('/returnForPayment').success(function (info){
				console.log('info')
				callback(info)
			})

		}

		return factory
	});
