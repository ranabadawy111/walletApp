import jwt from "jsonwebtoken";
import { userModel } from "../DB/model/user.model.js";
export const auth = () => {
  return async (req, res, next) => {
    try {
      let { authorization } = req.headers;
      let token = authorization.split(" ")[1];
      if (authorization && authorization.startsWith("Bearer")) {
        let verified = jwt.verify(token, process.env.JWTKEY);
        if (verified) {
          let user = await userModel.findById(verified.id);
          if (user) {
            req.user = user;
            req.currentUserID = user._id;
            next();
          } else {
            res.json({ message: "invalid user" });
          }
        } else {
          res.json({ message: "invalid token" });
        }
      } else {
        res.json({ message: "invalid token" });
      }
    } catch (error) {
      res.json({ message: "error", error });
    }
  };
};
