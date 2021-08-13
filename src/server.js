import express from "express";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();
const PORT = 4000;

app.get("/",globalRouter);
app.get("/videos",videoRouter);
app.get("/users",userRouter);
app.listen(PORT);