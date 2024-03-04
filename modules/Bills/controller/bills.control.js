import asyncHandler from "express-async-handler";
import {
  validatCreateBill,
  Bill,
  validateUpdateBill,
} from "../../../DB/model/bills.model.js";
import { userModel } from "./../../../DB/model/user.model.js";

import mongoose from "mongoose";

/*
 *@desc     Add new Bill
 *@route    /api/v1/saving/bills/:userId
 *@method   POST
 *@access   public
 */
export const addNewBill = asyncHandler(async (req, res) => {
  // Validate the request body
  const { error } = validatCreateBill(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { userId } = req.params;

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID." });
  }
  // Check if the user exists
  const user = await userModel.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found." });
  // Create a new bill
  const bill = new Bill({
    title: req.body.title,
    cost: req.body.cost,
    userBillId: userId,
  });

  const result = await bill.save();

  // Return the created bill
  return res.status(201).json(result);
});

/*
 *@desc     Get all Bills for specific user
 *@route    /api/v1/saving/bills/:userId
 *@method   GET
 *@access   public
 */
export const getAllBillsForUser = asyncHandler(async (req, res) => {
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

  // Fetch bills for the user and sort them in descending order by createdAt timestamp
  try {
    const bills = await Bill.find({ userBillId: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/*
 *@desc      Update specific bill for specific user
 *@route    /api/v1/saving/bills/:userId/:billId
 *@method   PUT
 *@access   public
 */

export const updateBillForUser = asyncHandler(async (req, res) => {
  const { userId, billId } = req.params;

  // Validate the request body
  const { error } = validateUpdateBill(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }
    // Check if the user exists in the database
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the bill exists for the user
    const bill = await Bill.findOne({
      _id: billId,
      userBillId: userId,
    });
    if (!bill) {
      return res.status(404).json({ message: "Bill not found for the user." });
    }

    // Update the bill document for the specific user
    const updatedBill = await Bill.findByIdAndUpdate(
      billId, // Find bill by its ID
      { $set: { title: req.body.title, cost: req.body.cost } }, // Update specific fields using $set
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedBill);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/*
 *@desc    Delete specific bill from specific user
 *@route    /api/v1/saving/bills/:userId/:billId
 *@method   DELETE
 *@access   public
 */
export const deleteBillForUser = asyncHandler(async (req, res) => {
  const { userId, billId } = req.params;

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID." });
  }
  // Check if the user exists in the database
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  // Check if the bill exists for the user
  const bill = await Bill.findOne({ _id: billId, userBillId: userId });
  if (!bill) {
    return res.status(404).json({ message: "Bill not found for the user." });
  }

  try {
    // Delete the bill document
    await Bill.findByIdAndDelete(billId);

    res.status(200).json({ message: "Bill deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});