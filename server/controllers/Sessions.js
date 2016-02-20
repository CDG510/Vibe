var mongoose = require('mongoose');
var Session = mongoose.model('Session');
var Studio = mongoose.model('Studio');


module.exports = (function(){
	return {
		//this will grab all questions to select for quiz
		show: function(req, res){
			console.log(req.body.studio, "is used to get found")
			Session.find({_studio: req.body.studio}, function(err, studio){
				//find all Orders
				if (err){
					console.log(err)
				}
				else{
					 console.log("YEAS WE GOT ", studio)
					res.send(JSON.stringify(studio.sessions));
				}
			})		// })
		},

		create: function(req, res){

			Studio.findOne({_id: req.body.studio}, function(err, studio){

			 var session = new Session({startsAt: req.body.startTime, endsAt: req.body.endTime, startHour: req.body.startHour, endHour: req.body.endHour, type: "info",  info: req.body.info, artist: req.body.artist, title: req.body.artist});
			 console.log(session, "is getting inserted")

			 session._studio = studio._id
			 studio.sessions.push(session)
			 //add the new session
			 session.save(function(err){
			 	studio.save(function(err, all){
			 		if(err){
			 		console.log(er)
			 	}
			 	else{
			 		console.log(all, "is getting sent back")
			 		res.send(JSON.stringify(all));
			 	}
			 	})

			 })
			})
		}

		}
}) ()
