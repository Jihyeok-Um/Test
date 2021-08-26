import express from "express";
import { editUser, removeUser, logOutUser ,startGithubLogin, finishGithubLogin } from "../controllers/userController";

const userRouter = express.Router();
userRouter.get("/edit", editUser);
userRouter.get("/remove", removeUser);
userRouter.get("/logout", logOutUser);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);


export default userRouter;