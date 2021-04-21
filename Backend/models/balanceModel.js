const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const balanceSchema = new Schema(
  {
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    payableTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    pendingAmt: { type: Number },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("balance", balanceSchema);
