import { expensesModel } from "../../../DB/model/expenses.model.js";
import { userModel } from "../../../DB/model/user.model.js";
import { categoriesModel } from "../../../DB/model/categories.model.js";
import bcrypt from "bcryptjs";

const updatePassword = async (req, res) => {
  let { currentPssword, newPassword, nweCPassword } = req.body;
  if (newPassword !== nweCPassword) {
    res.json({ message: "new Password must match new confirm password!" });
  }
  const user = await userModel.findById(req.user._id);
  let matched = await bcrypt.compare(currentPssword, user.password);
  if (matched) {
    const hashPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.saltRound)
    );
    const updatePassword = await userModel.findByIdAndUpdate(
      user._id,
      { password: hashPassword },
      { new: true }
    );
    res.json({ message: "password updated successfully", updatePassword });
  } else {
    res.json({ message: "current password not valid" });
  }
};

const profile = async (req, res) => {
  let user = await userModel.findById(req.currentUserID);
  if (user) {
    res.json({ message: "Done", user });
  } else {
    res.json({ message: "user not found" });
  }
};

const allExpenses = async (req, res) => {
  try {
    const userId = req.user._id;
    const { categoryId } = req.query;
    let userExpenses = await expensesModel.find({
      userId,
      ...(categoryId && { categoryId }),
    }); // getAllExpenseForOneCtegory if he send categoryID, if not getAllExpenseForAllCtegories
    res.json({ message: "User expenses retrieved successfully", userExpenses });
  } catch (error) {
    res.json({ message: "error", error });
    // res.status(500).json({ error: "Internal server error" });
  }
};

const allCategories = async (req, res) => {
  let userCategories = await categoriesModel.find({
    userId: req.user._id,
  });
  res.json({ message: "userCategories", userCategories });
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

export const allUsers = async (req, res) => {
  const allUsers = await userModel.find({});
  res.send({ message: "allUsers", allUsers });
};

export { profile, allExpenses, allCategories, updatePassword };
