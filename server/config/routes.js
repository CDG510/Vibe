// var admin       = require('../controllers/admin.js');
// var businesses  = require('../controllers/businesses.js');

module.exports = function(app, passport, client) {

//-------------------- AUTHENTICATION / LOGIN / SIGNUP ROUTES : START  ----------------//
app.post('/studio/new', passport.authenticate('local-signup', {
    successRedirect : '/dashboard', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

app.post('/studio/login', passport.authenticate('local-login', {
    successRedirect : '/dashboard', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

app.get('/logout', function(req, res){
  req.logout();
  res.status(200).json({status: 'Logged Out!'});
});
//-------------------- AUTHENTICATION / LOGIN / SIGNUP ROUTES : START  ----------------//


app.get('/get_studio/:id', function(req, res){
    console.log("IN ROUTES", req.params);
    messages.get_business_messages(req, res);
});

app.get('/get_artist/:id', function(req, res){
    console.log("IN ROUTES", req.params);
    messages.get_business_messages(req, res);
});


app.get('/all_studios', function(req, res){
  res.json({session: req.session, user: req.user});
});



};
