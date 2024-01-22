import { fetchRandom,fetchSpecific } from "./fetchFunctions.js";
import { updateResultsContainer } from "./updateResultsFunction.js";

const randomButton = document.getElementById('randomClick')

randomButton.addEventListener('click',  async (e) => {
    const randomResponse = await fetchRandom()
    updateResultsContainer(randomResponse.results)

    console.log(randomResponse.choice)

})

// neutral
const neutralButton = document.getElementById('neutralClick')
// ramshackle
const ramshackleButton = document.getElementById('ramshackleClick')
// malevolent
const malevolentButton = document.getElementById('malevolentClick')
// hearth
const hearthButton = document.getElementById('hearthClick')

const buttonArr = [neutralButton, ramshackleButton,malevolentButton,hearthButton]

const buttonValues = ["neutral", "ramshackle", "malevolent", "hearth"]

buttonArr.forEach((el,i) => 
    el.addEventListener('click',  async (e) => {
        const specificResponse = await fetchSpecific(buttonValues[i])
        updateResultsContainer(specificResponse.results)
    
        console.log(specificResponse.choice)
    
    })
)

