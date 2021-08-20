import express from "express";
import { upload, watch, getEdit, removeVideo, postEdit, getUpload, postUpload } from "../controllers/videoController";
 
const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/remove", removeVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;