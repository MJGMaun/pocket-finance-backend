const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
	createUser: async (req, res) => {
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET),
		});

		try {
			const savedUser = await newUser.save();

			res.status(201).json(savedUser);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	loginUser: async (req, res) => {
		try {
			const user = await User.findOne({email: req.body.email});
			!user && res.status(401).json("Wrong login details")

			const depcryptedPass = CryptoJS.AES.decrypt(user.password, process.env.SECRET)
			const depassword = depcryptedPass.toString(CryptoJS.enc.Utf8) // turn pass to string

			depassword !== req.body.password && res.status(401).json("Wrong password");

			const {password, __v, createdAt, updatedAt, ...others } = user._doc;

			const authToken = jwt.sign({
				id: user._id, isAdmin: user.isAdmin
			}, process.env.JWT_SECRET, {expiresIn: "21d"})

			res.status(200).json({ ...others, authToken})
		} catch (error) {
			res.status(500)
		}
	}
}