import { expensesModel } from "../../../DB/model/expenses.model.js";
import { userModel } from "../../../DB/model/user.model.js";
import { categoriesModel } from "../../../DB/model/categories.model.js";
const profile = async (req, res) => {
  let user = await userModel.findById(req.currentUserID);
  if (user) {
    res.json({ message: "Done", user });
  } else {
    res.json({ message: "user not found" });
  }
};
// allExpenses
// const allExpenses = async (req, res) => {
//   let userExpenses = await expensesModel.find({ catIDForExpense: req.user._id });
//   res.json({ message: "userExpenses", userExpenses });
// };
const allExpenses = async (req, res) => {
  try {
    // Assuming req.user._id represents the current user's ID
    let userExpenses = await expensesModel.find({
      catIDForExpense: "65dfb6e804fa5f50a2d03781",
    });
    res.json({ message: "User expenses retrieved successfully", userExpenses });
  } catch (error) {
    console.error("Error fetching user expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const allCategories = async (req, res) => {
  let userCategories = await categoriesModel.find({
    userCategoryId: req.user._id,
  });
  res.json({ message: "userCategories", userCategories });
};
export { profile, allExpenses, allCategories };
