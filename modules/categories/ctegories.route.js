import { Router } from "express";
const router = Router();
import {
  addCategory,
  updateCategory,
  deleteCategory,
} from "./controller/categories.control.js";
import { auth } from "../../middleware/auth.js";
import { myMulter, validationType } from "../../services/multer.js";
import { categoryPic } from "./controller/categories.control.js";

router.post("/addCategory", auth(), addCategory);
router.put("/updateCategory/:categoryId", updateCategory);
router.delete("/deleteCategory/:categoryId", deleteCategory);
router.post(
  "/categoryPic",
  auth(),
  myMulter(validationType.image, "uploads").single("image"),
  categoryPic
); 
router.get(
  "/categoryPic",
  auth(),
  myMulter(validationType.image, "uploads").single("image"),
  categoryPic
);
// https://walletapp-4pbn.onrender.com/api/v1/uploads/pIOF2PQlENeK-_YxfBtRc_up.jpg
// to get image on browser we use => http://localhost:3000/api/v1/uploads/pGnic1Tc5LdaUTZu6s8Ii_up.jpg
export default router;
