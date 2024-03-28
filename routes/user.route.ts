import express from "express";
import {
  LogOutUser,
  LoginUser,
  activateUser,
  getUserInfo,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updateAvatar,
  updatePassword,
  updateUserInfo,
} from "../controllers/user.controller";

import { AuthorizeRole, isAuthenticated } from "../middleware/auth";

const UserRouter = express.Router();

UserRouter.post("/registration", registrationUser);

UserRouter.post("/activate-user", activateUser);

UserRouter.post("/login", LoginUser);

UserRouter.post("/logout", isAuthenticated, LogOutUser);

UserRouter.post("/refreshtoken", updateAccessToken);

UserRouter.post("/me", isAuthenticated, getUserInfo);

UserRouter.post("/social-auth", socialAuth);

UserRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

UserRouter.put("/update-user-password", isAuthenticated, updatePassword);

UserRouter.put("/update-user-avatar", isAuthenticated, updateAvatar);

export default UserRouter;
