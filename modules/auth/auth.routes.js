import { Router } from "express";
const router = Router();
import { signIn, signUp } from "./controller/auth.control.js";

router.post("/signUp", signUp);
router.post("/signIn", signIn);



export default router;