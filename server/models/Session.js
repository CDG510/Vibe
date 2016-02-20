var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new mongoose.Schema({
	_studio: {type: mongoose.Schema.Types.ObjectId, ref: "Studio"},
	startsAt: Number,
	endsAt: Number,
	// startHour: String,
	// endHour: String,
	type: String,
	artist: String,
	info: String, 
	title: String,
	allDay: Boolean,
	created_at: {type: Date, default: new Date}

})


var Session = mongoose.model('Session', SessionSchema);
