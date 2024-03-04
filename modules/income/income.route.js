import express from "express";
import {
  addNewIncome,
  getAllIncomesForUser,
  updateIncomeForUser,
  deleteIncomeForUser,
} from "./controller/income.control.js";
const router = express.Router();
//    /api/v1/income/:userId
router.route("/:userId").post(addNewIncome).get(getAllIncomesForUser);

//    /api/v1/income/:userId/:incomeId
router
  .route("/:userId/:incomeId")
  .put(updateIncomeForUser)
  .delete(deleteIncomeForUser);

export default router;
