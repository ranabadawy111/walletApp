import express from "express";
import {
  addNewBill, getAllBillsForUser, updateBillForUser, deleteBillForUser,
} from "./controller/bills.control.js";
const router = express.Router();

//   /api/v1/saving/bills/:userId
router.route("/bills/:userId").post(addNewBill).get(getAllBillsForUser);


//    /api/v1/saving/bills/:userId/:billId
router.route("/bills/:userId/:billId").put(updateBillForUser).delete(deleteBillForUser)

export default router;