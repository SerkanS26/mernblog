import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

//sampla data
import posts from "./data/posts.js";
import users from "./data/users.js";

//models
import Post from "./models/postModel.js";
import User from "./models/userModel.js";

//database connection
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

// import date

const importData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const samplePosts = posts.map((post) => {
      return { ...post, user: adminUser };
    });

    await Post.insertMany(samplePosts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// destroy data

const destroyData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// run the function

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
