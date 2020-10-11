const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 21,
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 21,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 21,
	},
	date: {
		type: Date,
		default: Date.now()
	}
})



module.exports = mongoose.model('User', userSchema)