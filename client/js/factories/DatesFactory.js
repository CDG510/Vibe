vibe.factory("DatesFactory", function(){
	var factory = {}

	factory.ParseIt = function(date){

		var date = date.getTime();
		return date
	}

	factory.getThenParse = function(date, hours){
		console.log(date, hours, "BOUT TO GET PARSED")
		var sessionHours = hours.getHours()
		  var sessionMinutes = hours.getMinutes()
		  date.setHours(sessionHours)
		  date.setMinutes(sessionMinutes)
		  return date.getTime()
	}

	factory.getDateGiveParsed = function(date){
		var dateHours = date.getHours()
		var dateMinutes = date.getMinutes()
		date.setHours(dateHours);
		date.setHours(dateMinutes);
		return date.getTime()
	}


	factory.unParseThenSet = function(parsed) {
		  var unparsed = parseInt(parsed);
		  var realTime = new Date()
		  realTime.setTime(unparsed)
		  return realTime
		}

	factory.unStringDate = function(date){
		var newDate = new Date(date)
		var hours = newDate.getHours()
		var Minutes = newDate.getMinutes()
		var backTime = new Date()
		backTime.setHours(hours);
		backTime.setMinutes(Minutes)
		return backTime
	}

	return factory
})
