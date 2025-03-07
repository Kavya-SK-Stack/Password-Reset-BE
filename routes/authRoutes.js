const express = require("express");
const authController = require("../controllers/authControllers");
const auth = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.post("/new-password/:token", authController.resetPasswordForm);
authRouter.get("/profile", auth.verifyLogin, authController.profile);

module.exports = authRouter;
