const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const user = require("../models/user");

const authController = {
  signup: async (req, res) => {
    try {
      // get user input from request body
      const { name, email, password } = req.body;
      // check if user already exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      // bcrytp the password
      const hashedPassword = await bcryt.hash(password, 10);
      // create user object in database
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      //   save user in DB
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      // get user input from request body
      const { email, password } = req.body;
      // check if user exists
      const user = await User.findOne({ email });
      // check user does not exist
      if (!user) {
        return res
          .status(400)
          .json({ message: "User does not exist,Please signup" });
      }
      // check if password is correct
      const isMatch = await bcryt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // generate token
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      // Return token in the response
      res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  logout: async (req, res) => {
    try {
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "User does not exist, Please signup" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; //1h

      await user.save();

      //   nodemailer

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Password Reset request",
        text: `https://sky-app-sk.netlify.app/new-password/${token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      // send email with token
      res
        .status(200)
        .json({ message: "Password reset link sent to your email" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  resetPasswordForm: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.userId;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      const hashedPassword = await bcryt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();

      return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  profile: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId).select("-password");

      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = authController;
