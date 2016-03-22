var mongoose = require('mongoose');
var User = mongoose.model('User');
var Session = mongoose.model('Session');


module.exports = (function(){
	return {
		///get all
		show: function(req, res){
			 User.find({})
			 .populate('Session')
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
			User
			.findOne({username: req.body.username}, function(err, found){
				if (err){
					console.log(err)
				}
				else{
					res.send(JSON.stringify(found));
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
			 		res.send(JSON.stringify(foundUser));
			 	}
			 })
		},
		//simple search, find all related
		findStudiosSimple: function(req, res){
			User.find({ $and: [
				{profileType: "Studio"},
				{$or: [{city: new RegExp(req.body.searchTerm, "i")}, {username: new RegExp(req.body.searchTerm, "i")}, {specialty: new RegExp(req.body.searchTerm)}]}
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
///specific query for any of these terms in advanced search
		findStudios: function(req, res){
			User.find({ $and: [
				{profileType: "Studio"},
				{$or: [{city: new RegExp(req.body.city, "i")}, {username: new RegExp( req.body.username)}, {specialty: new RegExp	(req.body.specialty)}]}
				]}, function(err, foundUsers) {
					if(err){
			 		console.log(err)
			 	}
			 	else{
					console.log(foundUsers, "wee found ~~~~~~~~~~~")
			 		res.json(foundUsers);
			 	}
			})
	},



	updateProfile: function(req, res){
		if (req.body.profileType === "Studio"){
			User.findOneAndUpdate({_id: req.body.id}, {
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						mainContact: req.body.mainContact,
						specialty: req.body.specialty,
						phone: req.body.phone,
						location: req.body.location,
						profileImage: req.body.profileImage,
						fullBio: req.body.fullBio,
						members: req.body.members,
						websites: req.body.websites,
						profileType: req.body.profileType,
						businessName: req.body.businessName,
						schedule: req.body.schedule,
						city: req.body.city,
						numberOfRecordings: req.body.numberOfRecordings,
						price: req.body.price}, function(err, foundUser){
							if (err){
								console.log(err)
							}
							else {
								res.send(JSON.stringify(foundUser))
								// update info here
						}
					})
				} else {
					User.findOneAndUpdate({_id: req.body.id}, {
								firstName: req.body.firstName,
								lastName: req.body.lastName,
								mainContact: req.body.mainContact,
								specialty: req.body.specialty,
								phone: req.body.phone,
								location: req.body.location,
								profileImage: req.body.profileImage,
								fullBio: req.body.fullBio,
								members: req.body.members,
								websites: req.body.websites,
								city: req.body.city,
								profileType: req.body.profileType}, function(err, foundUser){
									if (err){
										console.log(err)
									}
									else {
										res.send(JSON.stringify(foundUser))
										// update info here
							}
				})
			}
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
