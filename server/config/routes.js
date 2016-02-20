// var admin       = require('../controllers/admin.js');
// var businesses  = require('../controllers/businesses.js');
var Studio = require('./../controllers/Studios.js');
var Artist = require('./../controllers/Artists.js');
var Session = require('./../controllers/Sessions.js')
var mongoose = require('mongoose');

//
module.exports = function(app, passport, client) {

//-------------------- AUTHENTICATION / LOGIN / SIGNUP ROUTES : START  ----------------//
// app.post('/studio/new', passport.authenticate('local-signup', {
//     successRedirect : '/profile', // redirect to the secure profile section
//     failureRedirect : '/signup', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// }));
// 
// app.post('/studio/login', passport.authenticate('local-login', {
//     successRedirect : '/dashboard', // redirect to the secure profile section
//     failureRedirect : '/profile', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// }));
//
// app.get('/logout', function(req, res){
//   req.logout();
//   res.status(200).json({status: 'Logged Out!'});
// });
//-------------------- AUTHENTICATION / LOGIN / SIGNUP ROUTES : START  ----------------//


// app.get('/get_studio/:id', function(req, res){
//     // console.log("IN ROUTES", req.params);
//     // messages.get_business_messages(req, res);
// });
//
// app.get('/get_artist/:id', function(req, res){
//     console.log("IN ROUTES", req.params);
//     // messages.get_business_messages(req, res);
// });
//
//
// app.get('/all_studios', function(req, res){
//   // res.json({session: req.session, user: req.user});
// });



// app.post('/userLogin', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//         if(err) {
//             return res.status(500).json({err: err});
//         }
//         if (!user) {
//             return res.status(401).json({err: info});
//         }
//         req.logIn(user, function(err) {
//             if(err) {
//                 return res.status(500).json({err: "could not log in user :("})
//             }
//             res.status(200).json({status: "BRO WE MADE IT"});
//         })
//     })(req, res, next);
// })
//
// app.get('/auth/facebook',
//   passport.authenticate('facebook'), function( req, res){});
//
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/profile');
//   });
//----------FOR ARTISTS
app.get('/showArtists', function(req, res){
		Artist.show(req, res);
	});

	app.post('/newMusician', function(req, res){
		Artist.create(req, res);
	});

//-----------------------FOR STUDIO RELATED
    app.post('/findStudios', function(req, res){
    	console.log("routing with", req.body)
		Studio.findSearch(req, res);
	});

	app.post('/addStudio', function(req, res){
		Studio.create(req, res);
	});

//------------FOR SESSIONS
    app.post('/addSession', function(req, res){
    Session.create(req, res)
	})

	app.post("/getSessions", function(req, res) {
		console.log("off to controler", req.body.studio)
	    Studio.findSessions(req, res)
	})


};
