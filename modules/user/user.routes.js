import { Router } from "express";
import {
  allCategories,
  allExpenses,
  allUsers,
  profile,
  updatePassword,
} from "./controller/user.control.js";
import { auth } from "../../middleware/auth.js";
import { updatePasswordSchema } from "./user.validation.js";
import { validation } from "../../middleware/validation.js";

const router = Router();


router.get("/profile", auth(), profile);
router.get("/expenses", auth(), allExpenses);
router.get("/allCategories", auth(), allCategories);
router.patch("/updatedPassword", auth(), validation(updatePasswordSchema), updatePassword);
router.get("/allUsers", allUsers);

export default router;
