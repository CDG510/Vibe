var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudioSchema = new mongoose.Schema({
    name: String,
    mainContact: String,
    technicians: Array,
	specialty: String,
    websites: Array,
    email: String,
    password: String,
    shortBio: String,
    fullBio: String,
    profileImage: String,
    location: String,
	phone: String,
	ratings: Array,
	schedule: Object,
    price: Number,
    sessions: [{type: Schema.ObjectId, ref: 'Session'}]
})

var Studio = mongoose.model('Studio', StudioSchema);
