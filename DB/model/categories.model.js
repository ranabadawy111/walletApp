import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // userId who i send message to him
      ref: "User", // to know who write this message
    },
    categoryName: {
      type: String,
      required: true,
    },
    categoryPic: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const categoriesModel = mongoose.model("categories", categorySchema);
