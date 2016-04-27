var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var StripeStrategy = require('passport-stripe').Strategy;
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

// passport.use(new StripeStrategy({
//      clientID: 'ca_85HBoyAWwpEv8c4XhKzTSHsPUvrza10d',
//      clientSecret: 'sk_test_ghnSVUwORQe2wvRk3tY5f2oU',
//      callbackURL: "http://localhost:8080/oauth/callback"
//    },
//    function(accessToken, refreshToken, stripe_properties, done) {
//    User.find({ stripeId: stripe_properties.stripe_user_id }, function (err, user) {
//     //  return done(err, user);
//     if(err){
//         console.log("nah mate")
//         return(null, stripe_properties)
//     } else{
//         console.log('lolnah')
//         return done(err, user)
//     }
//    });
//  }
// ));

module.exports = passport;
