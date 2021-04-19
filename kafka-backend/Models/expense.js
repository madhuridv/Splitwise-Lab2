const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
	{
		groupId: { type: mongoose.Schema.Types.ObjectId, ref: "group" },
		groupName: { type: String },
		exp: [
			{
				paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				expDesc: { type: String },
				amount: { type: Number },
				createdAt: { type: Date },
				comments: [
					{
						message: { type: String },
						userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
						username: { type: String },
						msgCreatedAt: { type: Date },
					},
				],
			},
		],
		groupTransaction: [
			{
				borrower: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				payableTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				pendingAmt: { type: Number },
			},
		],
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("expense", expenseSchema);