const Order = require("../models/Order");
const Product = require("../models/Product");
const midtrans = require("../config/midtrans");

module.exports = {
  checkout: async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    try {
      const product = await Product.findById(id);
      const order = await Order.create({
        price: product.price,
        product: product._id,
        user: user.id,
      });
      const transaction = await midtrans.createTransaction({
        transaction_details: {
          order_id: order._id,
          gross_amount: order.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: user.name,
          last_name: user.name,
          email: user.email,
          phone: user.phone,
        },
        callback: {
          finish: "https://google.com/",
        },
      });
      return res.send(transaction.redirect_url);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  callback: async (req, res) => {
      const body = req.body
    try {
      const order = await Order.findById(body.order_id)
      order.status = body.transaction_status
      await order.save()
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  },
};
