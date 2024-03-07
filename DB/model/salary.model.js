import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    incomes: {
      type: Number,
      required: true,
    },
    expenses:{
        type: Number,
        required: true,
    }
  },
  { timestamps: true }
);

export const salaryModel = mongoose.model("salary", salarySchema);
