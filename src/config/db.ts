import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// const db_uri = process.env.MONGO_DB_URI as string
const db_uri = process.env.MONGO_URI as string
const connectDB = async () => {
  try {
    await mongoose.connect(db_uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
