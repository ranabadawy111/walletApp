import { categoriesModel } from "../../../DB/model/categories.model.js";
import { expensesModel } from "../../../DB/model/expenses.model.js";

const addExpense = async (req, res) => {
  try {
    const userId = req.user._id;

    const { categoryId, amount, description } = req.body;
    const category = await categoriesModel.findById(categoryId);
    if (!category) {
      res.json({ message: "categoryID is not correct" });
    }

    const expense = new expensesModel({
      userId,
      categoryId,
      amount,
      description,
    });

    const addedExpense = await expense.save();

    res.json({ message: "added", addedExpense });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { amount, description } = req.body;
    const expense = await expensesModel.findById(expenseId);
    if (!expense) {
      res.json({ message: "expenseID is not correct" });
    }
    const updatedExpense = await expensesModel.findByIdAndUpdate(
      {
        _id: expenseId,
      },
      {
        amount,
        description,
      },
      { new: true }
    );
    res.json({ message: "updated", updatedExpense });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const expense = await expensesModel.findById(expenseId);
    if (!expense) {
      res.json({ message: "expenseID is not correct" });
    }
    const deletedExpense = await expensesModel.deleteOne({_id:expenseId});
    res.json({ message: "deleted", deletedExpense });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

export { addExpense, deleteExpense, updateExpense };
