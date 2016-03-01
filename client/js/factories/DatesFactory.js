vibe.factory("DatesFactory", function(){
	var factory = {}

	factory.ParseIt = function(date){
	 
		var date = date.getTime();
		return date
	}

	factory.getThenParse = function(date){

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
//get parsedString, make it into a date
// function unParseThenSet (parsed) {
//   var unparsed = parseInt(parsed);
//   var realTime = new Date()
//   realTime.setTime(unparsed)
//   return realTime
// }


	return factory
})