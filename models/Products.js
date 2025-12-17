const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {type: Number,required: true,unique: true},
    name: {type: String, required: true,trim: true},
    image: {type: String,required: true},
    sellingprice: {type: Number,required: true},
    originalprice: {type: Number,required: true},
    category: {type: String,required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
