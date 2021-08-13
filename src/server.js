import express from "express";
import globalRouter from "./routers/globalRouter";

const app = express();
const PORT = 4000;

app.use("/", globalRouter);
app.listen(PORT);