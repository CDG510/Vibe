var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new mongoose.Schema({
	_studio: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	startsAt: Number,
	endsAt: Number,
	studioName: String,
	type: String,
	artist: String,
	info: String,
	title: String,
	deletable: Boolean,
	allDay: Boolean,
	created_at: {type: Date, default: new Date},
	hash: String,
	salt: String,
	_user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})


var Session = mongoose.model('Session', SessionSchema);
