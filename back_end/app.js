const express = require("express");
const app = express();
const cors = require("cors");
const pollController = require("./controllers/pollController.js");

app.use(express.json());
app.use(cors());

app.use("/poll", pollController)

app.get("/", (req, res) => {
    res.status(200).json("Poll Everywhere Server")
})

app.get("*", (req,res) => {
    res.status(404).json({error: "Page not found"})
})

module.exports = app;