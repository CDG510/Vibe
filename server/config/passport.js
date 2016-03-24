var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var mongoose          = require('mongoose');
var bodyParser = require('body-parser');
var User = mongoose.model("User")



passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("into the db________________")
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("welcomeback! with", user)
      return done(null, user);
    });
  }
));

// passport.use(new FacebookStrategy({

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'



module.exports = passport;
