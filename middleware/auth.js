const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const payload = jwt.verify(token, "secret");
    req.user = payload;
    next()
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
