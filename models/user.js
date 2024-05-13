var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	username: String,
	password: String
}),
User = mongoose.model('User', userSchema);

module.exports = User;