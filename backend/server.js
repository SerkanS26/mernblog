import path from "path";

import express from "express";

// cookie-parser
import cookieParser from "cookie-parser";

//dotenv
import dotenv from "dotenv";
dotenv.config();

// import database connection
import connectDB from "./config/db.js";

// middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Import Routes
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// port
const PORT = process.env.PORT || 5000;

// host
const HOST = process.env.HOST || "0.0.0.0";

// database connection
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Routes

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// set __dirname to current directory
const __dirname = path.resolve();

// make the uploads folder static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any route that is not the api will be redirected to the index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// not found middleware
app.use(notFound);

// error handler middleware
app.use(errorHandler);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});
