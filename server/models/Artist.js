var mongoose = require('mongoose');
var Schema = mongoose.Schema

var ArtistSchema = new mongoose.Schema({
    stageName: String,
    genre: Array,
    type: String,
    members: Object,
    websites: Array,
    email: String,
    password: String,
    shortBio: String,
    fullBio: String,
    profileImage: String,
    location: String,
    firstName: String,
    lastName: String,
    price: Number
})

mongoose.model("Artist", ArtistSchema)
