import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connectDB() {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DataBase Connected successfully");
    });
    await mongoose
      .connect(process.env.MONGODB)
      .catch((e) => console.log("Error : " + e));
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDB;
