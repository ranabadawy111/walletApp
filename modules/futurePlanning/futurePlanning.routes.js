import express from "express";
import {
  addNewFuturePlan,
  getAllFuturePlansForUser,
  updateFuturePlanForUser,
  deleteFuturePlanForUser,
} from "./controller/futurePlanning.control.js";
const router = express.Router();

//   /api/v1/saving/futureplans/:userId
router
  .route("/futureplans/:userId")
  .post(addNewFuturePlan)
  .get(getAllFuturePlansForUser);

//  /api/v1/saving/futureplans/:userId/:billId
router
  .route("/futureplans/:userId/:futurePlanId")
  .put(updateFuturePlanForUser)
  .delete(deleteFuturePlanForUser);

export default router;