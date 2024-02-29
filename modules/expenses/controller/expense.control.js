import { categoriesModel } from "../../../DB/model/categories.model.js";
import { expensesModel } from "../../../DB/model/expenses.model.js";
// import { userModel } from "../../../DB/model/user.model.js";

const addExpense = async (req, res) => {
  try {
    let { catIDForExpense } = req.params; // userId
    let { amount, categoryName, cateDescription } = req.body;
    let foundedUser = await categoriesModel.findById(catIDForExpense);
    if (foundedUser) {
      let addExpense = new expensesModel({ catIDForExpense, amount, categoryName, cateDescription });
      let addedExpense = await addExpense.save();
      res.json({ message: "added", addedExpense });
    } else {
      res.json({ message: "categoryID is not correct" });
    }
  } catch (error) {
    res.json({ message: "error", error });
  }
};

export { addExpense };
