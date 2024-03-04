import joi from "joi";

export const signUpSchema = {
  body: joi
    .object()
    .required()
    .keys({
      firstName: joi.string().min(2).max(20).required(),
      lastName: joi.string().min(2).max(20).required(),
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi
        .string()
        .pattern(new RegExp("^[A-Z][a-z]{3,8}$"))
        .required(),
      cPassword: joi.ref("password"),
      profilePic: joi.string(),
      dueDate: joi.string().required(),
      // categoryName: joi.string().min(2).max(20),
      // categoryPic: joi.string(),
    }),
  // query: joi.object().required().keys({
  //   boo: joi.string().required(),
  // }),
};

export const signInSchema = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi
        .string()
        .pattern(new RegExp("^[A-Z][a-z]{3,8}$"))
        .required(),
    }),
};

export const sendCodeSchema = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    }),
};

export const forgetPasswordSchema = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi
        .string()
        .pattern(new RegExp("^[A-Z][a-z]{3,8}$"))
        .required(),
      code: joi.string().required(),
    }),
};
