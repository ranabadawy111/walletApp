import { categoriesModel } from "../../../DB/model/categories.model.js";
import { userModel } from "../../../DB/model/user.model.js";

const addCategory = async (req, res) => {
  try {
    let userId = req.user._id; // userId
    let { categoryName, categoryPic } = req.body;
    let foundedUser = await userModel.findById(userId);
    if (foundedUser) {
      let addcategory = new categoriesModel({
        userId,
        categoryName,
        categoryPic
      });
      let addedcategory = await addcategory.save();
      req.currentCateID = addedcategory._id;
      res.json({ message: "added", addedcategory });
    } else {
      res.json({ message: "userId is not correct" });
    }
  } catch (error) {
    res.json({ message: "error", error });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { categoryName, categoryPic, amount, description } = req.body;
    const category = await categoriesModel.findById(categoryId);
    if (!category) {
      res.json({ message: "categoryID is not correct" });
    }
    const updatedCategory = await categoriesModel.findByIdAndUpdate(
      {
        _id: categoryId,
      },
      {
        categoryName,
        categoryPic,
        amount,
        description,
      },
      { new: true }
    );
    res.json({ message: "updated", updatedCategory });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await categoriesModel.findById(categoryId);
    if (!category) {
      res.json({ message: "categoryID is not correct" });
    }
    const deletedCategory = await categoriesModel.deleteOne({
      _id: categoryId,
    });
    res.json({ message: "deleted", deletedCategory });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

const categoryPic = async (req, res) => {
  if (req.imageError) {
    res.json({ message: "Invalid Formate" });
  } else {
    if (!req.file) {
      res.json({ message: "please, upload image" });
    } else {
      const userId = req.user._id;
      const { categoryId } = req.query;
      const foundCategory = await categoriesModel.find({
        userId,
        categoryId,
      });
      if (foundCategory) {
        const updateCatePic = await categoriesModel.updateOne(
          {
            _id: categoryId,
          },
          { categoryPic: req.file.path }
        );
        res.json({ message: "Done", updateCatePic });
      }
      // console.log(req.file);
    }
  }
};

export { addCategory, updateCategory, deleteCategory, categoryPic };
