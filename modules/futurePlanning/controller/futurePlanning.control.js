import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import {
  validateCreateFuturePlan,
  FuturePlan,
  validateUpdateFuturePlan,
} from "../../../DB/model/futurePlanning.model.js";
import { userModel } from './../../../DB/model/user.model.js';

/*
 *@desc     Add new FuturePlan
 *@route    /api/v1/saving/futureplans/:userId
 *@method   POST
 *@access   public
 */
 export const addNewFuturePlan = asyncHandler(async (req, res) => {
  // Validate the request body
  const { error } = validateCreateFuturePlan(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { userId } = req.params;

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID." });
  }
  // Check if the user exists
  const user = await userModel.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found." });
  // Create a new FuturePlan
  const futurePlan = new FuturePlan({
    title: req.body.title,
    cost: req.body.cost,
    userFuturePlanId: userId,
  });

  const result = await futurePlan.save();

  // Return the created bill
  return res.status(201).json(result);
});

/*
 *@desc     Get all FuturePlans for specific user
 *@route    /api/v1/saving/futureplans/:userId
 *@method   GET
 *@access   public
 */
export const getAllFuturePlansForUser = asyncHandler(async (req, res) => {
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

  // Fetch FuturePlan for the user and sort them in descending order by createdAt timestamp
  try {
    const futurePlans = await FuturePlan.find({
      userFuturePlanId: userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(futurePlans);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/*
 *@desc      Update specific FuturePlan for specific user
 *@route    /api/v1/saving/futureplans/:userId/:futurePlanId
 *@method   PUT
 *@access   public
 */

 export const updateFuturePlanForUser = asyncHandler(async (req, res) => {
  const { userId, futurePlanId } = req.params;

  // Validate the request body
  const { error } = validateUpdateFuturePlan(req.body);
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

    // Check if the futurePlan exists for the user
    const futurePlan = await FuturePlan.findOne({
      _id: futurePlanId,
      userFuturePlanId: userId,
    });
    if (!futurePlan) {
      return res
        .status(404)
        .json({ message: "FuturePlan not found for the user." });
    }

    // Update the futurePlan document for the specific user
    const updatedFuturePlan = await FuturePlan.findByIdAndUpdate(
      futurePlanId, // Find futurePlan by its ID
      { $set: { title: req.body.title, cost: req.body.cost } }, // Update specific fields using $set
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedFuturePlan);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/*
 *@desc    Delete specific FuturePlan from specific user
 *@route    /api/v1/saving/futureplans/:userId/:futurePlanId
 *@method   DELETE
 *@access   public
 */
export const deleteFuturePlanForUser = asyncHandler(async (req, res) => {
  const { userId, futurePlanId } = req.params;
  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID." });
  }
  // Check if the user exists in the database
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Check if the futurePlan exists for the user
  const futurePlan = await FuturePlan.findOne({ _id: futurePlanId, userFuturePlanId: userId });
  if (!futurePlan) {
    return res.status(404).json({ message: "FuturePlan not found for the user." });
  }

  try {
    // Delete the FuturePlan document
    await FuturePlan.findByIdAndDelete(futurePlanId);

    res.status(200).json({ message: "FuturePlanId deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});