const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    members: { type: Array },
    groupName: { type: String },
    expense: [
      {
        paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        expDesc: { type: String },
        amount: { type: Number },
      },
    ],
    transaction: [
      {
        payableTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        borrower: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        amountPerPerson: { type: Number },
      },
    ],
    createdAt: { type: Date },
    entryType: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("expense", expenseSchema);
