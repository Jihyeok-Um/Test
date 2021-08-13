import express from "express";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();
const PORT = 4000;

app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);
app.listen(PORT);