const express = require("express");
const polls = express.Router();

const { accessResultsPage } = require("../puppeteer_functions/resultsPage.js")
const {randomClick} = require("../puppeteer_functions/randomClick.js")

polls.get("/", async (req,res) => {
    const randomClickResults = await randomClick()
    console.log(randomClickResults)
    res.status(200).json(randomClickResults)
})


module.exports = polls