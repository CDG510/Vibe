var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var StripeStrategy = require('passport-stripe').Strategy;
// var FacebookStrategy  = require('passport-facebook').Strategy;
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
//     clientID: '1530701907226627',
//     clientSecret: '38823705332f301c68dfe0984d8f5dd6',
//     callbackURL: "http://localhost:8080/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOne({ oauthID: profile.id }, function(err, user) {
//       if(err) {
//         console.log(err);  // handle errors!
//       }
//       if (!err && user !== null) {
//         done(null, user);
//       } else {
//         user = new User({
//           oauthID: profile.id,
//           name: profile.displayName,
//           created: Date.now()
//         });
//         user.save(function(err) {
//           if(err) {
//             console.log(err);  // handle errors!
//           } else {
//             console.log("saving user ...");
//             done(null, user);
//           }
//         });
//       }
//     });
//   }

// ));
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

passport.use(new StripeStrategy({
     clientID: 'ca_85HBoyAWwpEv8c4XhKzTSHsPUvrza10d',
     clientSecret: 'sk_test_ghnSVUwORQe2wvRk3tY5f2oU',
         callbackURL: "http://localhost:8080/auth/stripe/callback"
   },
   function(accessToken, refreshToken, stripe_properties, done) {
     User.findOne({ stripeId: stripe_properties.stripe_user_id }, function (err, user) {
       return done(err, user);
     });
   }
 ));

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'



module.exports = passport;
