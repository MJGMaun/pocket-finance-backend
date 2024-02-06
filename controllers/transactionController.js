const Transaction = require("../models/Transaction");

module.exports = {
	createTransaction: async (req, res) => {
		const new_transaction = new Transaction({
			user_id: req.user.id,
			... req.body,
		});

		try {
			const saved_transaction = await new_transaction.save();

			res.status(201).json(saved_transaction);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	getTransactions: async (req, res) => {
		try {
			const transactions = await Transaction.find({ user_id: req.user.id });
			if (!transactions || transactions.length === 0) {
				return res.status(404).json({ message: "No transactions found" });
			}
			const transaction_data = transactions.map(transaction => {
				const { __v, ...data } = transaction._doc;
				return data;
			});
			res.status(200).json(transaction_data);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
}