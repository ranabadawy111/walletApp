import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // userId
      ref: "User", // to know which user that expenses belongs to it.
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId, // categoryId
      ref: "categories", // to know which category that expenses belongs to it.
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const expensesModel = mongoose.model("expenses", expenseSchema);
