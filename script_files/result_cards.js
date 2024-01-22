import { fetchResults } from "./fetchFunctions.js";

try {
    const resultsObj = await fetchResults();
    // iterate through keys in obj
    for(const key in resultsObj){
        // create a card div
        const pollCard = document.createElement("div")
        // create h2 for option value
        const pollCardValue = document.createElement("h2")
        // give option value text of key/value of option/percentage
        pollCardValue.textContent= `${key}`
        // create span for pecent
        const pollCardPercent = document.createElement("span")
        // assign text value from obj[key] value
        pollCardPercent.textContent = `${resultsObj[key]}`
        // append card name to card
        pollCard.append(pollCardValue)
        pollCard.append(pollCardPercent)
        // append card to parent poll container div
        document.getElementById(`pollcard-container`).append(pollCard)  
    }
    console.log(resultsObj, "call made");
  } catch (error) {
    console.log(error);
  }