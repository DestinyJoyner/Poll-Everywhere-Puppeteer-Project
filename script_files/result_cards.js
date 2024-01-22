import { fetchResults } from "./fetchFunctions.js"

try {
    const resultsObj = await fetchResults();
    console.log(resultsObj, "call made");
  } catch (error) {
    console.log(error);
  }

