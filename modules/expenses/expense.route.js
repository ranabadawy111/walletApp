import { Router } from "express";
const router = Router();
import { addExpense } from "./controller/expense.control.js";
// import { allExpenses } from "../user/controller/user.control.js"
router.post("/addExpense/:catIDForExpense", addExpense);
// router.get("/", allExpenses);  

export default router;