import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/TEST", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to DB"));