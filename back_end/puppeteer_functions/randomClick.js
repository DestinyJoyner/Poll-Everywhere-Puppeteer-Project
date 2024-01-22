const puppeteer = require('puppeteer');

// function to go to poll page -> random click a button (choice, then go to results page (scrape percentage for each option and return data in object))

async function randomClick () {
  // debug warning : passing `headless: "new"` to `puppeteer.launch()`
  const browser = await puppeteer.launch({ headless: "new" });
  //   open new browser window
  const page = await browser.newPage();
  //   web address to go to
  // log a response code ?? -> try/catch, .then/catch
  const pollPageResponse = await page
    .goto("https://pollev.com/qainterview880")
    .then((res) => {
      return { status: res.status(200), message: "pollPage goto() success" };
    })
    .catch((err) =>
      console.log("pollPage goto() failed", {
        status: res.status(404),
        message: err,
      })
    );

  // log pollPage status response
  console.log(pollPageResponse);

  //   wait for component on page to be loaded (visible on DOM)
  await page.waitForSelector(
    ".component-response-multiple-choice__option__vote"
  );

  //  console.log within page.evaluate doesn't print to the Node.js console directly. It logs to the browser's console in the context of the page.
  page.on("console", (msg) => {
    console.log("consoleLog:", msg.text());
  });
  //   access all buttons with same class on poll page/ random index position and perform click()
  const buttonClickedPollPage = await page.evaluate(() => {
    // html access elements on DOM with class
    const buttons = document.querySelectorAll(
      ".component-response-multiple-choice__option__vote"
    );
    // random number from 0-4 (index of 4 button options)
    const indexPosition = Math.floor(Math.random() * buttons.length);
    // "buttonsArr" is nodeList, have to convert to actual array to manipulate
    // each obj within arr holds all properties of element (target,children,innerHTML etc..so can access)
    const buttonsArr = [...buttons].map((button) => button);
    // print out which button was clicked to see corresponding update on output page
    // console.log(indexPosition, buttonsArr[indexPosition].innerText);
    const buttonClickValue = buttonsArr[indexPosition].innerText;

    // perform click function on button at random index
    buttonsArr[indexPosition].click();

    return buttonClickValue;
  });

  console.log(buttonClickedPollPage);

  //   ACCESS RESULTS WEBPAGE -> https://viz.polleverywhere.com/multiple_choice_polls/AxE2ULWiYsaGgmZ0Zundf

  const resultsPageResponse = await page
    .goto(
      "https://viz.polleverywhere.com/multiple_choice_polls/AxE2ULWiYsaGgmZ0Zundf"
    )
    .then((res) => {
      return { status: res.status(200), message: "resultsPage goto() success" };
    })
    .catch((err) =>
      console.log("resultsPage goto() failed", {
        status: res.status(404),
        message: err,
      })
    );
  // log results page access status response
  console.log(resultsPageResponse);

  //   multiple choice #id -> id="options_multiple_choice_poll_instance_28696495"
  //   wait for poll results container to be visible on DOM
  await page.waitForSelector("#options_multiple_choice_poll_instance_28696495");

  /* 
access poll results div for each option 
    - 0: #id poll_option_51559428
        - letter option : span #id: keyword_poll_option_51559428
        - option Text (neutral) div class "break-all" -> span (Text selectors??? -p-text)
        - percentVal: div #id: percent_label_poll_option_51559428
    - 1: #id poll_option_51559429
    - 2: #id: poll_option_51559430
    - 3: #id poll_option_51559431
*/
  // console.log on results page
  page.on("console", (msg) => {
    console.log("consoleLog:", msg.text());
  });

  // Access poll results => function to iterate for all id values
  const pollResultsObj = await page.evaluate(() => {
    // html access elements on DOM with class
    // element id arr for results page
    const resultOptionsIdArr = ["51559428", "51559429", "51559430", "51559431"];
    const pollResultsData = resultOptionsIdArr.reduce((acc, idVal) => {
      // access id value of span with mult.choice option and text -> text is sibling span with .break-all class
      const elementTextDiv = document.querySelector(
        `#keyword_poll_option_${idVal}`
      );
      const elementText = elementTextDiv.nextElementSibling.innerText;
      // access span with percentage value by id
      const elementPercentageSpan = document.querySelector(
        `#percent_label_poll_option_${idVal}`
      ).innerText;
      // add choice name/percentage as key:vale in acc obj
      acc[elementText] = elementPercentageSpan;
      return acc;
    }, {});

    return pollResultsData;
  });
//   console.log(pollResultsObj, "results");

  //close the browser window (end)
  await browser.close();

  return {choice : buttonClickedPollPage, results: pollResultsObj}
}

module.exports = {randomClick}
