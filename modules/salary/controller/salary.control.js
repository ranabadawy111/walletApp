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
    // const threshold = incomes * 0.2;
    const userSalaryRest = incomes - expenses;

    const id = setInterval(async () => {
      if (userSalaryRest <= incomes * 0.5  && userSalaryRest > incomes * 0.2) { //2500
        res.json({
          message: `"Note: Your salary has reached 50%."`,
        });
        clearInterval(id);
      } else if (userSalaryRest <= incomes * 0.2) { //1000
        res.json({
          message: `"Note: Your salary has reached 80%."`,
        });
        clearInterval(id);
      } else {
        res.json({
          message: `"Note: Your salary is: ${userSalaryRest}"`,
        });
        clearInterval(id);
      }
    }, 1000); // Run every 24 hours
  } catch (error) {
    res.json({ message: "error", error });
  }
};
