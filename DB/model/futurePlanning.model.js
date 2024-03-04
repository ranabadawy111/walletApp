import mongoose from "mongoose";
//used joi for validation
import Joi from "joi";
const FuturePlanSchema = new mongoose.Schema(
  {
    userFuturePlanId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const FuturePlan = mongoose.model("FuturePlan", FuturePlanSchema);

// Validate creating  future planning item
function validateCreateFuturePlan(obj) {
  const schema = Joi.object({
    userFuturePlanId: Joi.string(),
    title: Joi.string().required(),
    cost: Joi.number().min(0).required(),
  });
  return schema.validate(obj);
}

// Validate updating  future planning item
function validateUpdateFuturePlan(obj) {
  const schema = Joi.object({
    userFuturePlanId: Joi.string(),
    title: Joi.string(),
    cost: Joi.number().min(0),
  });
  return schema.validate(obj);
}

export {
  FuturePlan,
  validateCreateFuturePlan,
  validateUpdateFuturePlan,
};
