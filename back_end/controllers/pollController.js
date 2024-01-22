const express = require("express");
const polls = express.Router();

const { accessResultsPage } = require("../puppeteer_functions/resultsPage.js")
const {randomClick} = require("../puppeteer_functions/randomClick.js")

// random click -> home
polls.get("/", async (req,res) => {
    const randomClickResults = await randomClick()
    console.log(randomClickResults)
    res.status(200).json(randomClickResults)
})

// get current results
polls.get("/results", async (req,res) => {
    const resultsPageData = await accessResultsPage()
    res.status(200).json(resultsPageData)
})


module.exports = polls