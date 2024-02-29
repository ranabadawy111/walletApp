import { categoriesModel } from "../../../DB/model/categories.model.js";
import { userModel } from "../../../DB/model/user.model.js";

const addCategory = async (req, res) => {
  try {
    let userId = req.user._id // userId
    let { categoryName, categoryPic } = req.body;
    let foundedUser = await userModel.findById(userId);
    if (foundedUser) {
      let addcategory = new categoriesModel({
        userId,
        categoryName,
        categoryPic,
      });
      let addedcategory = await addcategory.save();
      res.json({ message: "added", addedcategory });
    } else {
      res.json({ message: "userId is not correct" });
    }
  } catch (error) {
    res.json({ message: "error", error });
  }
};

export { addCategory };
