import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connection = async () => {
  await mongoose
    .connect(process.env.CONNECTION_DB)
    .then(() => {
      console.log("connected DB");
    })
    .catch(() => {
      console.log("error");
    });
};
