import { Router } from "express";
import {
  allCategories,
  allExpenses,
  profile,
} from "./controller/user.control.js";
import { auth } from "../../middleware/auth.js";
const router = Router();
// router.get("/", async (req, res) => {
//   res.json({
//     message: "asd",
//   });
// });

router.get("/profile", auth(), profile);
router.get("/allExpenses/:id", auth(), allExpenses);
router.get("/allCategories", auth(), allCategories);

export default router;
