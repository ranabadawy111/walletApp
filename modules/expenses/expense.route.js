import { Router } from "express";
const router = Router();
import { addExpense, deleteExpense, updateExpense } from "./controller/expense.control.js";
import { auth } from "../../middleware/auth.js";

router.post("/addExpense", auth(), addExpense);
router.put("/updatedExpense/:expenseId", updateExpense);
router.delete("/deletedExpense/:expenseId", deleteExpense);

export default router;
