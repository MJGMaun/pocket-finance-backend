const mongoose = require('mongoose')
const { Decimal128 } = mongoose.Schema.Types;

const TransactionSchema = new mongoose.Schema(
	{
		title: {type: String, default: ''},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		category_id: {type: String, required: false},
		sub_category_id: {type: String, required: false},
		account_id: {type: String, required: false},
		transfer_from_account_id: {type: String, required: false},
		transfer_to_account_id: {type: String, required: false},
		amount: {type: Decimal128, required: true},
		image_urls: {type: Array, required: true},
		notes: {type: String, default: false},
		datetime: {type: Date, required: false},
		type: {type: String, required: false},
		currency_id: { type: String, required: false },
		// currency_id: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "Currency",
		// 	required: true
		// },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
)

module.exports = mongoose.model("Transaction", TransactionSchema)