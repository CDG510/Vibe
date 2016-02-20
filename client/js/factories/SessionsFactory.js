vibe.factory('SessionsFactory', function ($http) {
		var Sessions = [];
		var factory = {};

		// function dateParse (date) {

		// }

		factory.getSessions = function(id, callback) {
			console.log("going to get studio sessions with", id)
			$http.post("/getSessions", id).success(function(output) {
				Sessions = output
				callback(output)

			})
		}

		factory.addSession = function(info , callback){
			console.log(info);
			for (session in Sessions) {
				//if requested session is after an exisiting start time & before an exisiting endTime (aka during)
				if (info.startsAt >= Sessions[session].startsAt && info.startsAt < Sessions[session].endsAt) {
					
				}
			}
			$http.post("/addSession", info).success(function(output) {
				console.log(output)
			})
		}

		



		return factory
	});