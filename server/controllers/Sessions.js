var mongoose = require('mongoose');
var Session = mongoose.model('Session');
var User = mongoose.model('User');

module.exports = (function(){
	return {
		//this will grab all questions to select for quiz
		show: function(req, res){
			Session.find({_studio: req.body.studio})
            .populate('sessions')
            .exec( function(err, studio){
				//find all Orders
				if (err){
					console.log(err)
				}
				else{
					res.send(JSON.stringify(studio.sessions));
				}
			})
		},

		studioCreate: function(req, res){
			User.findOne({_id: req.body.studio}, function(err, studio){
				if(err) {return}
				else {
					console.log(studio)
					User.findOne({username: req.body.artist}, function(err, artist){
						if (err){
							console.log(err)
							return
						} else {
							var session = new Session({
							startsAt: req.body.startTime,
							 endsAt: req.body.endTime,
							 startHour: req.body.startHour,
							 endHour: req.body.endHour,
							 type: "info",
							 info: req.body.info,
							 artist: req.body.artist,
							 title: req.body.artist,
							 deletable: true,
							 studioName: studio.username,
							 addedBy: req.body.addedBy
						 });
						 //set the studio
						 session._studio = studio._id
						 //add to sessions
						 studio.sessions.push(session)
						 //if we found an artist
						 if (artist !== null) {
							 session._user = artist._id
							 artist.sessions.push(session)
							 session.save(function(err, session){
							  if (err){
								  console.log(err)
							  } else {
								  studio.save(function(err, all){
									  if (err) {
										  console.log(err) }
										  else {
											  artist.save(function(err, everything){
												  if(err){
													console.log(er)
												}
												else{
													res.send(JSON.stringify(session));
												}
											  })

										  }

									})
							  }
							 })
						 } else {
							 session.save(function(err, savedSession){
								 if(err){
									 console.log(err)
								 } else {
									 studio.save(function(err, all){
										 if(err) {
											 console.log(err)
										 } else {
											 res.send(JSON.stringify(savedSession))
										 }
									 })
								 }
							 })
						 }
						 //add the new session

						}
					})
				}
			})
		},

		create: function(req, res){
            //req.body is the session
			console.log(req.body);
			User.findOne({_id: req.body.studio}, function(err, studio){
                if (err){
                    console.log(err)
                } else {
                    User.findOne({username: req.body.artist}, function(err, artist){
                        if (err){
                            console.log(err)
                        } else {
                            var session = new Session({
                            startsAt: req.body.startTime,
               				 endsAt: req.body.endTime,
               				 startHour: req.body.startHour,
               				 endHour: req.body.endHour,
               				 type: "info",
               				 info: req.body.info,
               				 artist: req.body.artist,
               				 title: req.body.title,
               				 deletable: true,
							 studioName: req.body.studioName,
							 addedBy: req.body.addedBy
               			 });
               			 session._studio = studio._id
                         session._user = artist._id
               			 studio.sessions.push(session)
                         artist.sessions.push(session)
               			 //add the new session
               			 session.save(function(err, session){
                             if (err){
                                 console.log(err)
                             } else {
                                 studio.save(function(err, all){
                                     if (err) {
                                         console.log(err) }
                                         else {
                                             artist.save(function(err, everything){
                                                 if(err){
                                			 		console.log(er)
                                			 	}
                                			 	else{
                                			 		res.send(JSON.stringify(session));
                                			 	}
                                             })

                                         }

                    			 	})

                             }
               			 })
                        }
                    })
                }
			})
		},

		deleteSession: function(req, res){
			User
				.findOne({_id: req.body.user.id, _user: req.body.event.user})
				.populate("sessions")
				.exec(function (err, foundUser){
				if(err){
					console.log(err)
				}
				else{
					var elementPos = foundUser.sessions.map(function(x) {return x._id; }).indexOf(req.body.event._id);
					console.log(elementPos)
					foundUser.sessions.splice(elementPos, 1)
					Session.remove({_id: req.body.event._id}, function(err){
						if (err){
							console.log(err)
						} else {
							res.end()
						}
					})

				}
			 })

		},

		update: function(req, res){
			console.log(req.body, "GETTING UPDATED~~~~~~~~~")
			Session.findOneAndUpdate({_id: req.body._id}, {
				startsAt: req.body.startsAt,
				endsAt: req.body.endsAt,
				artist: req.body.artist,
				title: req.body.title
			}, function(err, yee){
				if (err){
					console.log(err)
				} else {
					console.log(yee);
					res.send(JSON.stringify(yee))
				}
			})
		}
	}
}) ()
