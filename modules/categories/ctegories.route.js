import { Router } from "express";
const router = Router();
import { addCategory } from "./controller/categories.control.js";
import { auth } from "../../middleware/auth.js";

router.post("/addCategory", auth(), addCategory);
// router.get("/", allExpenses);

export default router;
