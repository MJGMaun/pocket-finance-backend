const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
	updateUser: async (req, res) => {
		if (req.body.password) {
			req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
		}

		try {
			const updated_user = await User.findByIdAndUpdate(
				req.params.id, {
					$set: req.body
				}, { new:true }
			)

			const {password, __v, created_at, updated_at, ...others } = updated_user._doc;

			return res.status(200).json({ ...others });
		} catch (error) {
			res.status(500).json(error);
		}
	},
	deleteUser: async (req, res) => {
		try {
			await User.findByIdAndDelete(req.params.id)

			return res.status(200).json({ message: "Account deleted" });
		} catch (error) {
			res.status(500).json(error);
		}
	},
	getUser: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			!user && res.status(401).json({ message: "No user found" });
			const {password, __v, created_at, updated_at, ...user_data } = user._doc;
			res.status(200).json({ ...user_data})
		} catch (error) {
			res.status(500)
		}
	},
	getAllUsers: async (req, res) => {
		try {
			const all_users = await User.find();
			res.status(200).json({ ...all_users})
		} catch (error) {
			res.status(500)
		}
	}
}