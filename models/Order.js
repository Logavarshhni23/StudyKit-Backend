const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    items: [
      {
        _id: { type: String },
        id: { type: Number },
        name: { type: String },
        image: { type: String },
        sellingprice: { type: Number },
        originalprice: { type: Number },
        category: { type: String },
        quantity: { type: Number },
      },
    ],
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userEmail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
