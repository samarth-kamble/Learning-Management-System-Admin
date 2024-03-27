import express from "express";
import {
  LogOutUser,
  LoginUser,
  activateUser,
  getUserInfo,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updateUserInfo,
} from "../controllers/user.controller";
import { AuthorizeRole, isAuthenticated } from "../middleware/auth";

const UserRouter = express.Router();

UserRouter.post("/registration", registrationUser);

UserRouter.post("/activate-user", activateUser);

UserRouter.post("/login", LoginUser);

UserRouter.post("/logout", isAuthenticated, AuthorizeRole("admin"), LogOutUser);

UserRouter.post("/refreshtoken", updateAccessToken);

UserRouter.post("/me", isAuthenticated, getUserInfo);

UserRouter.post("/social-auth", socialAuth);

UserRouter.post("/update-user-info", updateUserInfo);

export default UserRouter;
