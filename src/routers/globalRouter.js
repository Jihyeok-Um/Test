import express from "express";
export default globalRouter;

const handleHome = (req,res) => res.send("Home");
const globalRouter = express.Router();
globalRouter.get("/", handleHome);