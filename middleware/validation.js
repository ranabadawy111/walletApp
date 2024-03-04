const validationType = ["body", "params", "query", "headers"];
export const validation = (Schema) => {
  return (req, res, next) => {
    const validationErrorArr = [];
    validationType.forEach((key) => {
      if (Schema[key]) {
        const valid = Schema[key].validate(req[key], { abortEarly: false });
        if (valid.error) {
          validationErrorArr.push(valid.error.details);
        }
      }
    });
    if (validationErrorArr.length) {
      res.json({ message: "error", validationErrorArr });
    } else {
      next();
    }
  };
};
