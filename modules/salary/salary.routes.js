import { Router } from "express";
import { totalSalry } from "./controller/salary.control.js";
const router = Router();

router.post("/salaryRest", totalSalry);


export default router;