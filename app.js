import express from "express";
const server = express();
import * as routes from "./modules/index.routes.js";
import { connection } from "./DB/connection.js";

server.use(express.json()); // middleware
connection();
const baseURL = "/api/v1";

server.use(`${baseURL}/auth`, routes.authRoute);
server.use(`${baseURL}/user`, routes.userRoute);
server.use(`${baseURL}/expense`, routes.expenseRoute);
server.use(`${baseURL}/category`, routes.categoryRoute);


server.listen(3000, ()=>{
    console.log("Server is running");
})