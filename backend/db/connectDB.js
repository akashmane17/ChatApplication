import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected.");
  } catch (error) {
    console.log("Database connection failed: ", error.message);
  }
};
