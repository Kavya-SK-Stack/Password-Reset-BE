const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const auth = {
  // to check user is authendicated
  verifyLogin: async (req, res, next) => {
    try {
      const authorizationHeader = req.header("authorization");
      if (!authorizationHeader) {
        return res
          .status(401)
          .json({ message: "Access denied, no token provider" });
      }

      const token = authorizationHeader.substring(7);
      if (!token) {
        return res.status(401).json({ message: "invalid token format" });
      }

      // verify token

      const verified = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = verified.userId;

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "invalid or expired token" });
    }
  },
};

module.exports = auth;
