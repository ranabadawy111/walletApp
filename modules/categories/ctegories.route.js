import { Router } from "express";
const router = Router();
import { addCategory } from "./controller/categories.control.js";

router.post("/addCategory/:userCategoryId", addCategory);
// router.get("/", allExpenses);

export default router;