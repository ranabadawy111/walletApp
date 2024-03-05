import express from "express";
const router = express.Router();
import multer from "multer";
import path from "path";
import {
  uploadProfilePic,
  editAccount,
  deleteAccount,
} from "./controller/profile.control.js";


// Multer configuration for profile picture upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profileImage");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});
const upload = multer({ storage: storage });

// Upload profile picture
router.post("/:userId/upload", upload.single("profilePic"), uploadProfilePic);

// Edit account information
router.put("/:userId/edit", editAccount);

// Delete user account
router.delete("/:userId/delete", deleteAccount);

export default router;