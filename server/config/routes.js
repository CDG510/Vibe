
var Session = require('./../controllers/Sessions.js')
var mongoose = require('mongoose');
var Passport = require('passport')
var User = mongoose.model('User');
var UserController = require('./../controllers/User.js')
var jwt = require('express-jwt');
;

module.exports = function(app, passport) {

    var urlencodedParser = bodyParser.urlencoded({ extended: false })
}


var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


//
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


    //------------paypal payment


};
