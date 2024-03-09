import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
    },
    categoryName: {
      type: String,
      required: true,
    },
    categoryPic: {
      type: String,
      default: "",
      // required: true,
    },
  },
  { timestamps: true }
);

export const categoriesModel = mongoose.model("categories", categorySchema);
