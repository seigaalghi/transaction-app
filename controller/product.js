const Product = require("../models/Product");
const Joi = require("joi");
module.exports = {
  createProduct: async (req, res) => {
    const body = req.body
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
      });
      const { error } = schema.validate();
      if (error) {
        return res.status(400).json({
          message: error.message,
        });
      }
      const product = await Product.create(body);
      return res.status(201).json(product);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
