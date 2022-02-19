const { Schema, Types, model } = require("mongoose");

const productSchema = new Schema({
  id: {
    type: Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Product = model("product", productSchema)