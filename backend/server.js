import express from "express";

import cookieParser from "cookie-parser";

// cookie-parser

//dotenv
import dotenv from "dotenv";
dotenv.config();

// import database
import connectDB from "./config/db.js";

// middleware

// import routes

// database connection
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Routes

// port
const PORT = process.env.PORT || 5000;

// not found middleware

// error handler middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
