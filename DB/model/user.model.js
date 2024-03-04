import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "default.png",
    },
    dueDate: {
      type: String,
      required: true,
    },
    // categoryName: String,
    // categoryPic: String,
    code: String,
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
