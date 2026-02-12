import mongoose, { connect } from "mongoose";


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Connect at", conn.connection.host);
    console.log("Database Name :", conn.connection.name);
  } catch (error) {
    console.log("❌ MongoDB connection  failed:",error.message);
    process.exit(1);
  }
};

export default connectDB;
