
var Session = require('./../controllers/Sessions.js')
var mongoose = require('mongoose');
var Passport = require('passport')
var User = mongoose.model('User');
var UserController = require('./../controllers/User.js')
var jwt = require('express-jwt');
var Paypal = require('paypal-adaptive');
var paypalSdk = new Paypal({
  userId:    'christian.anchors-facilitator_api1.gmail.com',
  password:  'T9J6T6DANU4XU3EB',
  signature: 'AYZv5UZKLzSPZ.oyEgmdtB4L0fp.AIXb6UPjbpeoxudQ9KDSEkB0EdcJ',
  sandbox:   true //defaults to false
});

// var braintree = require("braintree");
//
// var gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: "useYourMerchantId",
//   publicKey: "useYourPublicKey",
//   privateKey: "useYourPrivateKey"
// });

module.exports = function(app, passport) {

    var urlencodedParser = bodyParser.urlencoded({ extended: false })
}


var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


//
module.exports = function(app, passport, client) {

//-------------------- AUTHENTICATION / LOGIN / SIGNUP ROUTES : START  ----------------//
app.post('/register', function(req, res, next) {
	console.log(req.body, "OMG WE MADE It")
	if(!req.body.email || !req.body.password) {
		return res.status(400).json({message: 'Please fill out all fields'})
	}

	var user = new User();
	console.log(user)
	user.username = req.body.userName;
	console.log(user)
	user.email = req.body.email
	user.setPassword(req.body.password)
	user.profileType = ""
	console.log(user, "WE GON MAKE IT HAPPEN")
	user.save(function(err, saved){
		if(err){return next (err)}
			return res.json({token: user.generateJWT(), user: saved})
	})
});


app.post('/loginUser', function(req, res, next) {
	console.log(req.body)

	if (!req.body.userName || !req.body.password) {
		console.log('nice try buddy_______')
		return res.status(400).json({message: 'Please fill out all fields'});
	}
	var user = req.body
	user.username = req.body.userName
	Passport.authenticate('local', function(err, user, info){
		if(err){
			console.log('nah bro')
			return next(err);}

		if (user){
			return res.json({token: user.generateJWT(), user: user});
		} else {
			console.log(info, "sorry mate")
			return res.status(401).json(info);
		}
	})(req, res, next);
});

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
        console.log("GOING tO MAKE A SESSION------------")
        Session.create(req, res)
	})

    app.post('/selfAddSession', function(req, res){
        Session.studioCreate(req, res)
    })

	app.post("/getSessions", function(req, res) {
		console.log("off to controler", req.body.studio)
	    UserController.findSessions(req, res)
	})

    app.post('/deleteSession', function(req, res){
        Session.deleteSession(req, res)
    })

    app.post('/findStudiobySession', function(req, res){
        Session.show(req, res)
    })


    //------------paypal payment


};
