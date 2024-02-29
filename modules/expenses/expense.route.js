import { Router } from "express";
const router = Router();
import { addExpense } from "./controller/expense.control.js";
import { auth } from "../../middleware/auth.js";
// import { allExpenses } from "../user/controller/user.control.js"
router.post("/", auth(), addExpense);
// router.get("/", allExpenses);

export default router;
