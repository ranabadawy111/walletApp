//incomeController.js
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import {
  Income,
  validateInputIncome,
  validateUpdateIncome,
} from "../../../DB/model/income.model.js";
import { userModel } from "../../../DB/model/user.model.js";

/*
 *@desc     Add new Income
 *@route    /api/v1/income/:userId
 *@method   POST
 *@access   public
 */
export const addNewIncome = asyncHandler(async (req, res) => {
  const { error } = validateInputIncome(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { userId } = req.params; // Extract userId from URL parameters
  try {
    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create income
    const income = new Income({
      title: req.body.title,
      cost: req.body.cost,
      userIncomeId: userId,
    });

    const result = await income.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


/*
 *@desc     Get all incomes for specific user
 *@route    /api/v1/income/:userId
 *@method   GET
 *@access   public
 */
 export const getAllIncomesForUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID." });
  }

  // Check if the user exists in the database
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Continue with fetching incomes for the user and sort them in descending order by createdAt timestamp
  try {
    const incomes = await Income.find({ userIncomeId: userId }).sort({ createdAt: -1 });
    
    res.status(200).json(incomes);
  } catch (error) {
    
    res.status(500).json({ message: "Internal Server Error" });
  }
});



/*
 *@desc     Update specific income for specific user
 *@route    /api/v1/income/:userId/:incomeId
 *@method   PUT
 *@access   public
 */
 export const updateIncomeForUser = asyncHandler(async (req, res) => {
  const { userId, incomeId } = req.params;
  // Validate the request body
  const { error } = validateUpdateIncome(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if the user exists in the database
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the income exists for the user
    const income = await Income.findOne({
      _id: incomeId,
      userIncomeId: userId,
    });
    if (!income) {
      return res
        .status(404)
        .json({ message: "Income not found for the user." });
    }

    // Update the income document for the specific user
    const updatedIncome = await Income.findByIdAndUpdate(
      incomeId, // Find income by its ID
      { $set: { title: req.body.title, cost: req.body.cost } }, // Update specific fields using $set
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/*
 *@desc    Delete specific income from specific user
 *@route    /api/v1/income/:userId/:incomeId
 *@method   DELETE
 *@access   public
 */
 export const deleteIncomeForUser = asyncHandler(async (req, res) => {
  const { userId, incomeId } = req.params;

  // Check if the user exists in the database
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Check if the income exists for the user
  const income = await Income.findOne({ _id: incomeId, userIncomeId: userId });
  if (!income) {
    return res.status(404).json({ message: "Income not found for the user." });
  }
  try {
    // Delete the income document
    await Income.findByIdAndDelete(incomeId);

    res.status(200).json({ message: "Income deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});