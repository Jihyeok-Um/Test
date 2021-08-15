import express from "express";
import { upload, watch, editVideo, removeVideo } from "../controllers/videoController";
 
const videoRouter = express.Router();

videoRouter.get("/watch", watch);
videoRouter.get("/edit", editVideo);
videoRouter.get("/remove", removeVideo);
videoRouter.get("/upload", upload);

export default videoRouter;