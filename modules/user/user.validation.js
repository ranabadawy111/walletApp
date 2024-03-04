import joi from "joi";

export const updatePasswordSchema = {
  body: joi
    .object()
    .required()
    .keys({
      currentPssword: joi
        .string()
        .pattern(new RegExp("^[A-Z][a-z]{3,8}$"))
        .required(),
      newPassword: joi
        .string()
        .pattern(new RegExp("^[A-Z][a-z]{3,8}$"))
        .required(),
      nweCPassword: joi.string().valid(joi.ref("newPassword")).required(),
    }),
  headers: joi
    .object()
    .required()
    .keys({
      authorization: joi.string().required(),
    })
    .unknown(true),
};
