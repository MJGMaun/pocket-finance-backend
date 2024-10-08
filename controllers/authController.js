const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
	createUser: async (req, res) => {
		const new_user = new User({
			username: req.body.username,
			email: req.body.email,
			password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET),
		});

		try {
			const saved_user = await new_user.save();

			res.status(201).json(saved_user);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	loginUser: async (req, res) => {
		try {
			const user = await User.findOne({email: req.body.email});
			!user && res.status(401).json({ message: "Invalid credentials" })

			const depcrypted_pass = CryptoJS.AES.decrypt(user.password, process.env.SECRET)
			const de_password = depcrypted_pass.toString(CryptoJS.enc.Utf8) // turn pass to string

			de_password !== req.body.password && res.status(401).json({ message: "Wrong password" });

			const {password, __v, created_at, updated_at, ...others } = user._doc;

			const auth_token = jwt.sign({
				id: user._id, is_admin: user.is_admin
			}, process.env.JWT_SECRET, {expiresIn: "21d"})

			res.status(200).json({ ...others, auth_token})
		} catch (error) {
			res.status(500)
		}
	}
}