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

// port
const PORT = process.env.PORT || 5000;

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

// not found middleware
app.use(notFound);

// error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
