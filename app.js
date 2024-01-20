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
  await page.waitForSelector(
    ".component-response-multiple-choice__response-options"
  );
  const buttons = await page.$eval(
    ".component-response-multiple-choice__response-options",
    (div) => div.children
  );
// const buttons = await page.evaluate(
//     () => document.querySelector(".component-response-multiple-choice__response-options").children["0"]
//   );




  //  buttons = object with 4 indexed keys => rep 4 button options
  const neutralButtonClass =
    ".component-response-multiple-choice__option__value";
  const neutralButton = await page.waitForSelector(
    neutralButtonClass,
    (div) => div.textContent
  );
//    console.log(buttons)
  //  const buttonClick = await page.click(neutralButtonClass)
  //  const buttons = await page.waitForSelector(".component-response-multiple-choice__option")
  //  const neutral = await buttons?.evaluate(el => el)

async function checkButtons(childNodes) {
    // console.log(childNodes)
    const eventKey = Object.keys(childNodes["3"])[0]
    const voteButtonEventObj = childNodes["3"][eventKey].events.click[0]
    const undoButtonEventObj = childNodes["3"][eventKey].events.click[1]
    console.log(voteButtonEventObj.selector)
    await page.$eval(voteButtonEventObj.selector, button => button.click())
    await page.$eval(undoButtonEventObj.selector, button => button.click())

  return voteButtonEventObj.selector
    /* 
        childNodes[key][eventKey].events.click -> array
            [0] -> obj -> .selector(class for vote button)
            [1] -> obj -> .selector (class for undo button )
    */
//    await page.click(voteButtonEventObj.selector)
    for (key in childNodes) {
      // console.log(childNodes[key]["events"])
    //   console.log(childNodes[key]);
            /* 
            console.log(childNodes[key])
            {jQuery3710086532340103286031: { events: { click: [Array] }, handle: {} },
            jQuery3710086532340103286032: { modelCid: 'c16' }}
            */
    // all children share ame key values (1st Jquery key) to access envent.click (arr) -> obj.keys[0]
//     const eventKey = Object.keys(childNodes[key])[0]
//     const voteButtonEventObj = childNodes[key][eventKey].events.click[0]
//     const undoButtonEventObj = childNodes[key][eventKey].events.click[1]
//     /* 
//         childNodes[key][eventKey].events.click -> array
//             [0] -> obj -> .selector(class for vote button)
//             [1] -> obj -> .selector (class for undo button )
//     */
//    await page.click(voteButtonEventObj.selector)
    }
  }
  const checkKey = await checkButtons(buttons);
  console.log(checkKey)
// await page.waitForSelector(checkKey)
// await page.click(checkKey)
//   const hearth = await page.click(checkKey)
//   console.log(hearth)
// const hearth = await page.waitForSelector(voteButtonEventObj.selector, button => button)

  //  console.log(buttons)
  // const ramshackle =
  // const malevolent =
  // const hearth =
  // console.log(neutral)
  await browser.close();
})();
