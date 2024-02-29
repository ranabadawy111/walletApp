import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../../../DB/model/user.model.js";

export const signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    password,
    cPassword,
    email,
    profilePic,
    salary,
    dueDate,
    categoryName,
    categoryPic,
  } = req.body;
  if (password === cPassword) {
    const user = await userModel.findOne({ email });
    if (user) {
      res.json({ message: "you already register" });
    } else {
      const hashed = await bcrypt.hash(
        password,
        parseInt(process.env.saltRound)
      );
      const saveUser = await userModel({
        firstName,
        lastName,
        email,
        password: hashed,
        profilePic,
        salary,
        dueDate,
        categoryName,
        categoryPic,
      });
      const savedUser = await saveUser.save();
      res.json({ message: "added", savedUser });
    }
  } else {
    res.json({ message: "your password don't mathched co-password" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const matched = await bcrypt.compare(password, user.password);
    if (matched) {
      const token = jwt.sign(
        { isLogin: true, id: user._id },
        process.env.JWTKEY
      );
      res.json({ message: "you already logged in now...", user, token });
    } else {
      res.json({ message: "password is invalid" });
    }
  } else {
    res.json({ message: "you should register first!" });
  }
};

/*
{
    "firstName": "rana",
    "lastName": "badawy",
    "password": "123",
    "cPassword": "123",
    "email": "ranabadawy373@gmail.com",
    "profilePic": "rana.png",
    "salary": 10000,
    "dueDate": "1/2/2000"
}
{
	"userName": "ranabadawy373@gmail.com",
  "password": "123"
}
*/
