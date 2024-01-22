import { fetchResults } from "./fetchFunctions.js";

try {
    const resultsObj = await fetchResults();
    // iterate through keys in obj
    for(const key in resultsObj){
        // create a card div
        const pollCard = document.createElement("div")
        const pollCardValue = document.createElement("h2")
        pollCardValue.textContent= `${key}: ${resultsObj[key]}`
        pollCard.append(pollCardValue)
        document.getElementById(`pollcard-container`).append(pollCard)
        
    }
    console.log(resultsObj, "call made");
  } catch (error) {
    console.log(error);
  }