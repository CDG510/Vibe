
var Session = require('./../controllers/Sessions.js')
var mongoose = require('mongoose');
var Passport = require('passport')
var User = mongoose.model('User');
var UserController = require('./../controllers/User.js')
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var CLIENT_ID = 'ca_85HBoyAWwpEv8c4XhKzTSHsPUvrza10d';
var API_KEY = 'sk_test_ghnSVUwORQe2wvRk3tY5f2oU';
var qs = require('querystring');
var request = require('request');
var express = require('express');

var TOKEN_URI = 'https://connect.stripe.com/oauth/token';
var AUTHORIZE_URI = 'https://connect.stripe.com/oauth/authorize';

var stripe = require('stripe')(API_KEY);



module.exports = function(app, passport, client) {

//-------------------- AUTHENTICATION / LOGIN / SIGNUP ROUTES : START  ----------------//
app.post('/register', function(req, res, next) {

	if(!req.body.email || !req.body.password) {
		return res.status(400).json({message: 'Please fill out all fields'})
	}

	var user = new User();
	user.username = req.body.userName;
	user.email = req.body.email
	user.setPassword(req.body.password)
	user.profileType = ""
	user.save(function(err, saved){
		if(err){return next (err)}
			return res.json({token: user.generateJWT(), user: saved})
	})
});


app.post('/loginUser', function(req, res, next) {

	if (!req.body.userName || !req.body.password) {
		return res.status(400).json({message: 'Please fill out all fields'});
	}
	var user = req.body
	user.username = req.body.userName
	Passport.authenticate('local', function(err, user, info){
		if(err){
			return next(err);}

		if (user){
			return res.json({token: user.generateJWT(), user: user});
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});

///go to stripe to signup
	app.post('/authorize', function(req,res){

        res.send(AUTHORIZE_URI + '?' + qs.stringify({
          response_type: 'code',
          scope: 'read_write',
          client_id: CLIENT_ID
        }));
      })

//
// for getting a token after signingup
app.post('/saveStripeInfo', function(req, res) {

    var code = req.body.code;
	var user = req.body.user
    // Make /oauth/token endpoint POST request
	// UserController.getStripeToken(req, res)
	console.log(code, user, "GOING TO GET A TOKEN")
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
        return res.json(user);

        } else{
            var accessToken = JSON.parse(body).access_token;
            var stripeInfo = JSON.parse(body)
			console.log(body)
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
								console.log("AYEEEEEEEE", success)
							    res.json(success);
                            }
                        })
                  	}
                })
            }
    });
  });

  app.post('/payForSession', function(req, res){
	  console.log(req.body)
	//   stripe.charges.create({
	//     amount: req.body.studio.price,
	//     currency: 'usd',
	//     source: req.body.token
	//   }, {stripe_account: req.body.studio.stripe_user_id});
  })

//~~~~~~~~~~~USER ROUTES

app.post("/findUser", function(req, res){
    UserController.findOne(req, res)
})

app.post("/updateProfile", function(req, res){
	UserController.updateProfile(req, res)
})

app.post("/getUserInfo", function(req, res){
	UserController.findSessions(req , res)
})

app.post("/findStudios", function(req, res){
	UserController.findStudios(req, res)
})

app.post("findStudiosByCity", function(req, res){
    UsersController.findStudiosByCity(req, res)
})

app.post("/findStudiosSimple", function(req, res){
	UserController.findStudiosSimple(req, res)
})


//------------FOR SESSIONS
    app.post('/addSession', function(req, res){
        Session.create(req, res)
	})

    app.post('/selfAddSession', function(req, res){
        Session.studioCreate(req, res)
    })

	app.post("/getSessions", function(req, res) {
	    UserController.findSessions(req, res)
	})

    app.post('/deleteSession', function(req, res){
        Session.deleteSession(req, res)
    })

    app.post('/findStudiobySession', function(req, res){
        Session.show(req, res)
    })

    app.post('/updateSession', function(req, res){
        Session.update(req, res)
    })




};
