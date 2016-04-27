var mongoose = require('mongoose');
var User = mongoose.model('User');
var Session = mongoose.model('Session');
var CLIENT_ID = 'ca_85HBoyAWwpEv8c4XhKzTSHsPUvrza10d';
var API_KEY = 'sk_test_ghnSVUwORQe2wvRk3tY5f2oU';
var qs = require('querystring');
var request = require('request');
var express = require('express');

var TOKEN_URI = 'https://connect.stripe.com/oauth/token';
var AUTHORIZE_URI = 'https://connect.stripe.com/oauth/authorize';



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

		findOne: function(req, res){
			User
			.findOne({username: req.body.username}, function(err, found){
				if (err){
					console.log(err)
				}
				else{
					User.findOne({_id: found._id})
					.populate("sessions")
					.exec(function (err, foundUser){
						res.send(JSON.stringify(foundUser));

					})
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

		findStudiosByCity: function(req, res){
			User.find({ $and: [
				{profileType: "Studio"},
				{city: new RegExp(req.body.searchTerm, "i")}
				]}, function(err, foundUsers) {
					if(err){
					console.log(err)
				}
				else{
					res.json(foundUsers);
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
					res.json(foundUsers);
				}
				})


	},
///specific query for any of these terms in advanced search
		findStudios: function(req, res){
			console.log(req.body, "~~~~~~~~~~~~~~~~~~~	")
			User.find({ $and: [
				{profileType: "Studio"},
				{$or: [{city: new RegExp (req.body.city, "i")}, {username: req.body.username}, {specialty: req.body.specialty}]}
				]}, function(err, foundUsers) {
					if(err){
			 		console.log(err)
			 	}
			 	else{
			 		res.json(foundUsers);
			 	}
			})
	},



	updateProfile: function(req, res){
		if (req.body.profileType === "Studio"){
			User.findOneAndUpdate({_id: req.body._id}, { $set: {
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
				gear: req.body.gear,
				gallery: req.body.gallery,
				numberOfRecordings: req.body.numberOfRecordings,
				price: req.body.price
			}
		}, {new: true}, function(err, savedGuy){
							if (err){
								console.log(err)
							}
							else {

								res.send(JSON.stringify(savedGuy))
								// update info here
						}
					})
				} else {
					User.findOneAndUpdate({_id: req.body._id}, {
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
								profileType: req.body.profileType}, {new: true}, function(err, foundUser){
									if (err){
										console.log(err)
									}
									else {
										res.send(JSON.stringify(foundUser))
									}
				})
			}
		},

		getStripeToken: function(req, res){
			request.post({
			  url: TOKEN_URI,
			  form: {
				grant_type: 'authorization_code',
				client_id: CLIENT_ID,
				code: code,
				client_secret: API_KEY
			  }
			}, function(err, r, body) {
				if(err){
				console.log(err)
				return res.redirect('http://localhost:8080/#/profile/'+user.username);

				} else{
					var accessToken = JSON.parse(body).access_token;
					var stripeInfo = JSON.parse(body)
					// For demo's sake, output in response:
					User.findOne({_id: user._id}, function(err, foundUser){
						  if(err) {
							  console.log(err)
						  }
						  else{
								foundUser.Stripe = stripeInfo
								foundUser.save( function(err, success){
									if(err){
										console.log(err)
									} else{
									   res.json
										// res.redirect('http://localhost:8080/#/profile/'+success.username);

									}
								})
						  }
						})
					}
			});
		}

	}

}) ();
