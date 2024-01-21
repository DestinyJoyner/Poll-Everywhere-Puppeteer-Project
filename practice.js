const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://pollev.com/qainterview880");
  // div class = component-list component-response-multiple-choice_response-options
  //  for each ,multiple choice option
  // div class component-response-multiple-choice__option
  // button class component-response-multiple-choice__option__vote
  // div class component-response-multiple-choice__option__results-count
  //  await page.waitForSelector(".component-response-multiple-choice__response-container", div => div.textContent)
  

//   await page.waitForSelector(
//     ".component-response-multiple-choice__response-options"
//   );
  await page.waitForSelector(".component-response-multiple-choice__option__vote");
//   page.$$ function returns an array of ElementHandles for all elements that match the specified selector.
//   const buttonParent = await page.$$(".component-response-multiple-choice__option__vote");

//  console.log within page.evaluate doesn't print to the Node.js console directly. It logs to the browser's console in the context of the page.
// difference btw page.$eval() && page.evaluate()
  page.on('console', (msg) => {
    console.log('consoleLog:', msg.text());
  });
await page.evaluate(() => {
   const buttons =  document.querySelectorAll(".component-response-multiple-choice__option__vote")
//    to try and avoid massive clicking of first [0] button
// const childIndex = (Math.floor(Math.random() * buttons.length)) == 0 ? 3 : 2;
   const childIndex = Math.floor(Math.random() * buttons.length);
  const buttonsArr = [...buttons].map(button => button)
console.log(childIndex, buttonsArr)
   buttonsArr[childIndex].click()
});
// console.log(buttonList)
//   const buttonParent = await page.$(".component-response-multiple-choice__response-options");

// Use page.evaluate to execute the function in the context of the page
// const buttons = await page.evaluate(buttonParent => {

//   return Array.from(buttonParent.children);
// }, buttonParent);

// console.log(buttonParent);

// const childIndex = Math.floor(Math.random() * buttonParent.length);
// console.log(childIndex)
/* 
    reason not registering the click even though no error:
        - https://stackoverflow.com/questions/70398134/puppeteer-trigger-click-of-button-not-working
        -element needs to be visually clickable.

*/
// await buttonParent[childIndex].click()

// const childEventObj = Object.keys(buttons[childIndex])[0]
// const childButtonVote = buttons[childIndex][childEventObj].events.click[0].selector
// const childButtonUndo =buttons[childIndex][childEventObj].events.click[1].selector
// console.log(childEventObj, buttons[childIndex][childEventObj].events.click)

// Assuming your 'modelCid' attribute is directly on the child element
// const childElement = await buttonParent.$(`[data-model-cid="${buttons[childIndex][cidNum].modelCid}"]`);
// console.log(childIndex)
// Perform the click operation on the child element
// await childElement.click();
/*   const buttonParent = await page.$(
    ".component-response-multiple-choice__response-options"
  )
//   const buttons = await page.$eval(
//     ".component-response-multiple-choice__response-options", button => button.children
//   );

const buttons = await page.evaluate(buttonParent => buttonParent.children, buttonParent);
  
  console.log(buttons)
    const childIndex = Math.floor(Math.random()*4)
    const cidNum = Object.keys(buttons[`${childIndex}`])[1]
    // console.log(Object.keys(buttons[`${childIndex}`])[1])
console.log(buttons[`${childIndex}`], childIndex)
  const childElement = await buttonParent.$(`[data-model-cid="${buttons[`${childIndex}`][cidNum].modelCid}"]`) */
//   console.log(childElement, childIndex)
//   await childElement.click()
//   const childIndex = Math.floor(Math.random()*4)
//   console.log(childIndex)

// try {
//     await buttons[childIndex].click();
//   } catch (error) {
//     console.error('Error clicking button:', error.message);
//   }
  


  await browser.close();
})();


 // randomly choose child index value from 0 -4
    /*     const childIndex = Math.floor(Math.random()*4)
        for(const child in buttons){
            console.log(child)
            if(child == childIndex){
                const eventKey = Object.keys(buttons[childIndex])[0]
                const voteButtonEventObj = buttons[childIndex][eventKey].events.click[0]
                const undoButtonEventObj = buttons[childIndex][eventKey].events.click[1]
                console.log(voteButtonEventObj.selector)
                // await page.$eval(voteButtonEventObj.selector, button => button.click())
                // await page.$eval(undoButtonEventObj.selector, button => button.click())
            }
        } */
// const buttons = await page.evaluate(
//     () => document.querySelector(".component-response-multiple-choice__response-options").children["0"]
//   );





  //  buttons = object with 4 indexed keys => rep 4 button options
//   const neutralButtonClass =
//     ".component-response-multiple-choice__option__value";
//   const neutralButton = await page.waitForSelector(
//     neutralButtonClass,
//     (div) => div.textContent
//   );
//    console.log(buttons)
  //  const buttonClick = await page.click(neutralButtonClass)
  //  const buttons = await page.waitForSelector(".component-response-multiple-choice__option")
  //  const neutral = await buttons?.evaluate(el => el)

  async function checkButtons(childNodes) {
    // console.log(childNodes)
    const eventKey = Object.keys(childNodes["2"])[0]
    const voteButtonEventObj = childNodes["2"][eventKey].events.click[0]
    const undoButtonEventObj = childNodes["2"][eventKey].events.click[1]
    console.log(voteButtonEventObj.selector)
    await page.$eval(voteButtonEventObj.selector, button => button.click())
    await page.$eval(undoButtonEventObj.selector, button => button.click())

  return voteButtonEventObj.selector
}