var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');

module.exports = (function(){
	return {
		//this will grab all Artists to select for quiz
		quiz: function(req, res){
			Artist.find({}, function(err, Artists){
				//find all Orders
				if (err){
					console.log(err)
				}
				else{
					res.send(JSON.stringify(Artists));
				}
			})		// })
		},

		create: function(req, res){
			console.log('starting with......')
			 console.log(req.body)
			 var artist = new Artist({name: req.body.name, genre: req.body.genre, location: req.body.location, bio: req.body.bio});
			 artist.save(function(err, result){
			 	if(err){
			 		console.log(er)
			 	}
			 	else{
			 		console.log(result)
			 		res.send(JSON.stringify(result));
			 	}
			 })
		}



		}
}) ()
