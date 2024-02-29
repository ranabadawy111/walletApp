import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    catIDForExpense: {
      type: mongoose.Schema.Types.ObjectId, // categoryId
      ref: "categories", // to know which category that expenses belongs to it.
    },
    amount: {
      type: Number,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    cateDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const expensesModel = mongoose.model("expenses", expenseSchema);
