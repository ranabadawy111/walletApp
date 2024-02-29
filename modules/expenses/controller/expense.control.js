import { categoriesModel } from "../../../DB/model/categories.model.js";
import { expensesModel } from "../../../DB/model/expenses.model.js";
// import { userModel } from "../../../DB/model/user.model.js";

const addExpense = async (req, res) => {
  console.log("====================================");
  console.log("asdasd");
  console.log("====================================");
  try {
    const userId = req.user._id;
    
    const { categoryId, amount, title, description } = req.body;
    const category = await categoriesModel.findById(categoryId);
    if (!category) {
      res.json({ message: "categoryID is not correct" });
    }

    const expense = new expensesModel({
      userId,
      categoryId,
      amount,
      title,
      description,
    });

    const addedExpense = await expense.save();

    res.json({ message: "added", addedExpense });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

export { addExpense };
