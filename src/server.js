import express from "express";
const app = express();
const PORT = 4000;

const handleHome = (req, res) => {
    res.send("Home");
};

app.get("/", handleHome);
app.listen(PORT);