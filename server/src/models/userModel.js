import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["regular", "google", "hybrid"],
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;