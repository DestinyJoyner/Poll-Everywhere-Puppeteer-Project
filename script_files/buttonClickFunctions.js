import { fetchRandom } from "./fetchFunctions.js";
import { updateResultsContainer } from "./updateResultsFunction.js";

const randomButton = document.getElementById('randomClick')

randomButton.addEventListener('click',  async (e) => {
    const randomResponse = await fetchRandom()
    updateResultsContainer(randomResponse.results)

    console.log(randomResponse.choice)

})