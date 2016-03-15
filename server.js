var express = require("express");
var	app = express();
var	bodyParser 	= require("body-parser");
var	path = require("path");
var	mongoose = require("mongoose");
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var _ = require("underscore");
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var moment = require('moment');
var jwt = require('express-jwt');
// var auth = jwt({secret: 'SECRET', userProperty: 'payload'})
moment().format();




app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev')); //logs every request to console
app.use(cookieParser()); //read cookies (needed for auth)
app.use(express.static(path.join(__dirname, "./client")));


require('./server/config/mongoose.js');//for mongoose usage
require('./server/config/routes.js')(app);

var passport = require('./server/config/passport.js');
// require('./models/Users');

app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session


var hostname = process.env.HOSTNAME || 'localhost', port = 8080;
console.log("Simple static server listening at http://" + hostname + ":" + port);
var server = app.listen(port, hostname);
require('./server/config/routes.js')(app, passport);
