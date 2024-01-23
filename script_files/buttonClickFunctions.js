import { fetchRandom, fetchSpecific } from "./fetchFunctions.js";
import { updateResultsContainer } from "./updateResultsFunction.js";

const randomButton = document.getElementById("randomClick");

randomButton.addEventListener("click", async (e) => {
  const randomResponse = await fetchRandom();
  // print which value was randomly selected onto dom

  const h3Tag = document.querySelector("h3");
  h3Tag.innerHTML = ""
  h3Tag.textContent = `${randomResponse.choice}`

//   pollButtonsDiv.insertAdjacentElement("afterend", buttonClickedHeader);

  updateResultsContainer(randomResponse.results);

  // console.log(randomResponse.choice);
});

// neutral
const neutralButton = document.getElementById("neutralClick");
// ramshackle
const ramshackleButton = document.getElementById("ramshackleClick");
// malevolent
const malevolentButton = document.getElementById("malevolentClick");
// hearth
const hearthButton = document.getElementById("hearthClick");

const buttonArr = [
  neutralButton,
  ramshackleButton,
  malevolentButton,
  hearthButton,
];

const buttonValues = ["neutral", "ramshackle", "malevolent", "hearth"];

buttonArr.forEach((el, i) =>
  el.addEventListener("click", async (e) => {
    const h3Tag = document.querySelector("h3");
  h3Tag.innerHTML = ""
    const specificResponse = await fetchSpecific(buttonValues[i]);
    updateResultsContainer(specificResponse.results);

    // console.log(specificResponse.choice);
  })
);
