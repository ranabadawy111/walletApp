import mongoose from "mongoose";
//used joi for validation
import Joi from "joi";
const BillSchema = new mongoose.Schema(
  {
    userBillId: {
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

const Bill = mongoose.model("Bill", BillSchema);

// validate creating  bill
function validatCreateBill(obj) {
  const schema = Joi.object({
    title: Joi.string().required(),
    cost: Joi.number().min(0).required(),
  });
  return schema.validate(obj);
}

// Validate updating a bill
function validateUpdateBill(obj) {
  const schema = Joi.object({
    title: Joi.string(),
    cost: Joi.number().min(0),
  });
  return schema.validate(obj);
}

export {Bill , validatCreateBill , validateUpdateBill};
