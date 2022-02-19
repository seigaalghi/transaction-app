const { Schema, Types, model } = require("mongoose");

const orderSchema = new Schema({
  id: {
    type: Types.ObjectId,
  },
  price: {
    type: String,
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product"
  },
  status :{
    type : String,
    default : "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Order = model("order", orderSchema);
