import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid"; // generate unique and random id
import { userModel } from "../../../DB/model/user.model.js";
import { sendEmail } from "../../../services/sendEmail.js";

export const signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    password,
    cPassword,
    email,
    profilePic,
    dueDate,
  } = req.body;
  if (password === cPassword) {
    const user = await userModel.findOne({ email });
    if (user) {
      res.json({ message: "you already register" });
    } else {
      const hashedPass = await bcrypt.hash(
        password,
        parseInt(process.env.saltRound)
      );
      const saveUser = await userModel({
        firstName,
        lastName,
        email,
        password: hashedPass,
        cPassword: hashedPass,
        profilePic,
        dueDate,
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

export const sendCode = async (req, res) => {
  let { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.json({ message: "you didn't register yet!" });
  } else {
    // const OTPCode = Math.floor(Math.random() * (1999 - 1940 + 1) + 1940);
    const OTPCode = nanoid();
    // here, we save code in DB
    await userModel.findByIdAndUpdate(user._id, { code: OTPCode });
    const message = `Your OTPCode is ${OTPCode}`;
    sendEmail(user.email, message);
    res.json({ message: "Done please check your email" });
  }
};

export const forgetPassword = async (req, res) => {
  const { code, email, password } = req.body;
  try {
    if (!code) {
      res.json({ message: "code is not valid" });
    } else {
      const user = await userModel.findOne({ email, code });
      if (!user) {
        res.json({ message: "email or code is not valid" });
      } else {
        const hashPass = await bcrypt.hash(
          password,
          parseInt(process.env.JWTKEY)
        );
        const updatedPass = await userModel.findByIdAndUpdate(
          user._id,
          { code: null, password: hashPass },
          { new: true }
        );
        res.json({ message: "password updated successfully", updatedPass });
      }
    }
  } catch (error) {
    res.json({ message: "error", error });
  }
};

// Logout
export const logout = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if user is logged in by verifying if token exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Delete token associated with the user from the database
    await userModel.findByIdAndUpdate(userId, { token: null });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};