import express from "express";
import { getEdit , removeUser, logOutUser ,startGithubLogin, finishGithubLogin, startGoogleLogin} from "../controllers/userController";

const userRouter = express.Router();
userRouter.get("/edit", getEdit);
userRouter.get("/remove", removeUser);
userRouter.get("/logout", logOutUser);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/google/start", startGoogleLogin);


export default userRouter;