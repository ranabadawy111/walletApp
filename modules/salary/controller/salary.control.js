import { salaryModel } from "../../../DB/model/salary.model.js";
import { userModel } from "../../../DB/model/user.model.js";

export const totalSalry = async (req, res) => {
  try {
    const { userId, incomes, expenses } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      res.json({
        message: "User Not Found!",
      });
      return;
    }
    let addSalary = new salaryModel({
      userId,
      incomes,
      expenses,
    });
    let addedSalary = await addSalary.save();

    const threshold = incomes * 0.2;
    const userSalaryRest = incomes - expenses; 
    console.log(threshold, userSalaryRest);

    const id = setInterval(async () => {
      if (userSalaryRest <= threshold) {
        console.log("ssssss");
        res.json({
          message: `"Note: Your salary has reached 80%."`,
        });
      } else {
        res.json({
          message: `"Note: Your salary is: ${userSalaryRest}"`,
        });
      }
    }, 24 * 60 * 60 * 1000); // Run every 24 hours
  } catch (error) {
    res.json({ message: "error", error });
  }
};
