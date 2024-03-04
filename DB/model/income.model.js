import mongoose from "mongoose";
//used joi for validation
import Joi from "joi";

const IncomeSchema = new mongoose.Schema(
  {
    userIncomeId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

//validate input Income
function validateInputIncome(obj) {
  //validation with joi
  const schema = Joi.object({
    userIncomeId: Joi.string(),
    title: Joi.string().trim().required(),
    cost: Joi.number().min(0).required(),
  });
  return schema.validate(obj);
}

//validate update income
function validateUpdateIncome(obj) {
  //validation with joi
  const schema = Joi.object({
    userIncomeId: Joi.string(),
    title: Joi.string().trim(),
    cost: Joi.number().min(0),
  });

  return schema.validate(obj);
}

//Income Model
const Income = mongoose.model("Income", IncomeSchema);

export { Income, validateInputIncome, validateUpdateIncome };
