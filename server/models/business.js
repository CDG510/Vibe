// var mongoose = require('mongoose');
// // var bcrypt = require('bcrypt-nodejs');
// var Schema = mongoose.Schema;

// var userSchema = new mongoose.Schema({
//     oathID: Number,
//     name: String,
//     created: Date
// })
// // var BusinessSchema = new mongoose.Schema({
// //   local: {
// //     name: String,
// //     email: String,
// //     personal_number: String,
// //     business_website: String,
// //     number: String,
// //     password: String,
// //     accounttype: String,
// //     messages_recieved: Number,
// //     messages_sent: Number,
// //     tabbs: [{type: Schema.Types.ObjectId, ref: 'Tabb'}],
// //     messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
// //   }
// // })
// //
// //
// // //methods =============================
// // //generate hash
// userSchema.methods.generateHash = function(password){
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };
// //

// module.exports = mongoose.model('User', userSchema);
