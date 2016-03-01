var mongoose = require('mongoose');
var User = mongoose.model('User');
var Session = mongoose.model('Session');


module.exports = (function(){
	return {
		///get all
		show: function(req, res){
			 User.find({})
			 .populate('sessions')
			 .exec(function(err, Users){
			 	if(err){
			 		console.log(err)
			 	}
			 	else{
			 		res.send(JSON.stringify(Users));
			 	}
			 })

		},

//get 9he
		findOne: function(req, res){
			console.log(user.body, "bout to get found")
			User.findOne({_id: req.body.User}, function(err, User){
				if (err){
					console.log(err)
				}
				else{
					 console.log("YEAS WE GOT ", User)
					res.send(JSON.stringify(User));
				}
			})

		},
///get all sessions for one User
		findSessions: function(req, res){
			User
				.findOne({_id: req.body.User})
				.populate("sessions")
				.exec(function (err, foundUser){
			 	if(err){
			 		console.log(err)
			 	}
			 	else{
			 		console.log(foundUser, "back at it again")
			 		res.send(JSON.stringify(foundUser));
			 	}
			 })
		},
///search query for any of these terms
		findStudios: function(req, res){
			console.log(req.body, "IS GETTING FOUND________________")
			User.find({ $and: [
				{profileType: "Studio"},
				{$or: [{location: req.body.location}, {username: req.body.username}, {specialty: req.body.specialty}]}
				]}, function(err, foundUsers) {
					if(err){
			 		console.log(err)
			 	}
			 	else{
			 		console.log(foundUsers, "were found!!!!!!")
			 		res.json(foundUsers);
			 	}
				})


	},

	updateProfile: function(req, res){
			User.findOneAndUpdate({_id: req.body.id}, {
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						mainContact: req.body.mainContact,
						specialty: req.body.specialty,
						phone: req.body.phone,
						location: req.body.location,
						profileImage: req.body.profileImage.toString(),
						fullBio: req.body.fullBio,
						members: req.body.members,
						websites: req.body.websites,
						profileType: req.body.profileType,
						businessName: req.body.businessName,
						schedule: req.body.schedule,
						price: req.body.price}, function(err, foundUser){
							if (err){
								console.log(err)
							}
							else {
								console.log(foundUser, "JUST GOT UPDATED");
								res.send(JSON.stringify(foundUser))
								// update info here
						}
					})
				},
//probably to update ratings
		updateRating: function(req, res){
			User.find({_id: req.body.id}, function(err, foundUser){
				if (err){
					console.log(err)
				}
				else {
					console.log(foundUser);
					foundUser.rating.push(req.body.rating)
					var newRating = (foundUser.rating/foundUser.rating.length)
				}
			})
		}

	}

}) ();
