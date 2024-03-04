import multer from "multer";
import { nanoid } from "nanoid";

export const validationType = {
    image: ["image/png", "image/jpeg", "image/jpg"]
}


export const myMulter = (acceptType, customPath) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, nanoid() + "_" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (acceptType.includes(file.mimetype)) {
      cb(null, true);
    }else {
      req.imageError = true;
      cb(null, false);
    }
  }
  const upload = multer({ dest: "/uploads", fileFilter, storage });
  return upload; 
};
// http://localhost:3000/api/v1/uploads/RO7l9yoz16mMR4KRgqPL5_up.jpg