import express from "express";
import { registrationUser } from "../controllers/user.controller";

const UserRouter = express.Router();

UserRouter.post("/registration", registrationUser);

export default UserRouter;
