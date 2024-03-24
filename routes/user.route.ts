import express from "express";
import {
  LogOutUser,
  LoginUser,
  activateUser,
  registrationUser,
} from "../controllers/user.controller";
import { AuthorizeRole, isAuthenticated } from "../middleware/auth";

const UserRouter = express.Router();

UserRouter.post("/registration", registrationUser);
UserRouter.post("/activate-user", activateUser);
UserRouter.post("/login", LoginUser);
UserRouter.post("/logout", isAuthenticated, AuthorizeRole("admin"), LogOutUser);

export default UserRouter;
