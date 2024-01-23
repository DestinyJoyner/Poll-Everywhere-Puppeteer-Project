const express = require("express");
const polls = express.Router();

const { accessResultsPage } = require("../puppeteer_functions/resultsPage.js")
const {randomClick} = require("../puppeteer_functions/randomClick.js")
const {specificOptionClick} = require("../puppeteer_functions/optionClick.js")

// random click -> home
    // include query value for specific inputted choice value
polls.get("/", async (req,res) => {
    // check for queries
    const  query  = req.query
    let choice
    if(query["choice"]){
        const choiceValue = query["choice"].toLowerCase()
        choice = await specificOptionClick(choiceValue)
    }else{
        choice = await randomClick()
    }
    // run function to scrape results page
    const resultsPageData = await accessResultsPage()

    res.status(200).json({
        status: choice.status,
        choice: choice.buttonClicked, 
        results: resultsPageData })
    
})

// get current results
polls.get("/results", async (req,res) => {
    const resultsPageData = await accessResultsPage()
    res.status(200).json(resultsPageData)
})


module.exports = polls