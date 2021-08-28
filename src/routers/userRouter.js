import express from "express";
import { getEdit, postEdit, removeUser, logOutUser ,startGithubLogin, finishGithubLogin, startGoogleLogin} from "../controllers/userController";
import { imageFiles } from "../middlewares";

const userRouter = express.Router();
userRouter.route("/edit").get(getEdit).post(imageFiles.single("image"), postEdit);
userRouter.get("/remove", removeUser);
userRouter.get("/logout", logOutUser);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/google/start", startGoogleLogin);


export default userRouter;