require('dotenv').config()
import "./db";
import express from "express";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import session from "express-session";
import { localsMiddleware } from "./middlewares";
import MongoStore from 'connect-mongo';

const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}));

app.use(localsMiddleware);
app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);
app.listen(PORT);