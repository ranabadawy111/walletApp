import { Router } from "express";
const router = Router();
import { validation } from "./../../middleware/validation.js";
import {
  forgetPasswordSchema,
  sendCodeSchema,
  signInSchema,
  signUpSchema,
} from "./auth.validation.js";
import {
  sendCode,
  signIn,
  signUp,
  logout,
  forgetPassword,
} from "./controller/auth.control.js";
;

router.post("/signUp", validation(signUpSchema), signUp);
router.post("/signIn", validation(signInSchema), signIn);
router.post("/logout/:userId",logout);
router.post("/sendCode", validation(sendCodeSchema), sendCode);
router.post(
  "/forgetPassword",
  validation(forgetPasswordSchema),
  forgetPassword
);

export default router;
