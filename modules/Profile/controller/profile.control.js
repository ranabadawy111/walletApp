
import { userModel } from './../../../DB/model/user.model.js';

// Upload profile picture
export const uploadProfilePic = async (req, res) => {
  const userId = req.params.userId;
  const profilePic = req.file.path; // Path to uploaded profile picture

  try {
    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Update profile picture for the user
    await userModel.findByIdAndUpdate(userId, { profilePic });
    res.status(200).json({ message: "Profile picture uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit account information
export const editAccount = async (req, res) => {
  const userId = req.params.userId;
  const { firstName, lastName, email, password, dueDate } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update account information for the user
    await userModel.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      email,
      password,
      dueDate,
    });
    res
      .status(200)
      .json({ message: "Account information updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete user account
export const deleteAccount = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user account
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
