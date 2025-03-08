const express = require("express");
const authRouter = require("./routes/authRoutes.js");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://sky-app-sk.netlify.app/",
    credentials: true,
  })
);

app.use("/auth", authRouter);

module.exports = app;
