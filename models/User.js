const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: {type: String, required: true, unique: true},
		email: {type: String, required: true, unique: true},
		password: {type: String, required: true},
		is_admin: {type: Boolean, default: false},
		image_url: {type: String, required: false}, // todo: add default image_url
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
)

module.exports = mongoose.model("User", UserSchema)