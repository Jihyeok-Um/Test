import express from "express";
import { trending , search } from "../controllers/videoController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import { imageFiles } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.route("/join").get(getJoin).post(imageFiles.single("image"), postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/search", search);

export default globalRouter;