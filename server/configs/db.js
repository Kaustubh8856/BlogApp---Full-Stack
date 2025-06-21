import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to DB ${mongoose.connection.host}`);
  } catch (error) {
    console.log("DB Error:", error);
  }
};

export default connectDB;
