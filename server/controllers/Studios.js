var mongoose = require('mongoose');
var Studio = mongoose.model('Studio');
var Session = mongoose.model('Session');


module.exports = (function(){
	return {
		///get all
		show: function(req, res){
			 Studio.find({}).populate('sessions').exec(function(err, Studios){
			 	if(err){
			 		console.log(err)
			 	}
			 	else{
			 		res.send(JSON.stringify(Studios));
			 	}
			 })

		},
///add
		create: function(req, res){
			 console.log(req.body)
			 var studio = new Studio({name: req.body.name, contact: req.body.contact, specialty: req.body.specialty, phone: req.body.phone, location: req.body.location, rating: [parseInt(req.body.rating)]});
			 studio.save(function(err, result){
			 	if(err){
			 		console.log(er)
			 	}
			 	else{
			 		console.log(result)
			 		res.send(JSON.stringify(result));
			 	}
			 })
		},
//get 9he
		findOne: function(req, res){
			console.log(req.body.studio, "is used to get found")
			Studio.findOne({_id: req.body.studio}, function(err, studio){
				if (err){
					console.log(err)
				}
				else{
					 console.log("YEAS WE GOT ", studio)
					res.send(JSON.stringify(studio));
				}
			})

		},
///get all sessions for one studio
		findSessions: function(req, res){
			console.log(req.body.studio);
			Studio
				.findOne({_id: req.body.studio})
				.populate("sessions")
				.exec(function (err, foundStudio){
			 	if(err){
			 		console.log(err)
			 	}
			 	else{
			 		console.log(foundStudio)
			 		res.send(JSON.stringify(foundStudio));
			 	}
			 })
		},
///search query for any of these terms
		findSearch: function(req, res){
			console.log(req.body)
			console.log(req.body.location);
			Studio.find({$text: {$search: req.body.location+' '+req.body.name+' '+req.body.specialty} }, function (err, foundStudio){
			 	if(err){
			 		console.log(err)
			 	}
			 	else{
			 		console.log(foundStudio)
			 		res.json(foundStudio);
			 	}
			 }
			)
	},
//probably to update ratings
		update: function(req, res){
			console.log(req.body);
			Studio.find({name: req.body.name}, function(err, foundStudio){
				if (err){
					console.log(err)
				}
				else {
					console.log(foundStudio);
					foundStudio.rating.push(req.body.rating)
					var newRating = (foundStudio.rating/foundStudio.rating.length)
				}
			})
		}

	}

}) ();
