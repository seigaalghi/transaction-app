const User = require("../models/User");
const Joi = require("joi");
const jwt = require('jsonwebtoken')
module.exports = {
  register: async (req, res) => {
    const body = req.body
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.number().required(),
      });
      const { error } = schema.validate();
      if (error) {
        return res.status(400).json({
          message: error.message,
        });
      }
      const user = await User.create(body);
      const payload = {
          name : user.name,
          email : user.email,
          id : user._id,
          phone : user.phone
      }
      const token = jwt.sign(payload, "secret")
      return res.status(201).json({
          token
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
