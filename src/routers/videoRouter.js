import express from "express";
import { watch, getEdit, deleteVideo, postEdit, getUpload, postUpload } from "../controllers/videoController";
import { videoFiles } from "../middlewares"

const videoRouter = express.Router();

videoRouter.get("/:id([0-9,a-f]{24})", watch);
videoRouter.route("/:id([0-9,a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9,a-f]{24})/delete", deleteVideo);
videoRouter.route("/upload").get(getUpload).post(videoFiles.single("video"), postUpload);

export default videoRouter;