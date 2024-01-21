const puppeteer = require("puppeteer");

(async () => {
  // debug warning : passing `headless: "new"` to `puppeteer.launch()`
  const browser = await puppeteer.launch({ headless: "new" });
  //   open new browser window
  const page = await browser.newPage();
  //   web address to go to
  // log a response code ?? -> try/catch, .then/catch
  const pollPageResponse = await page.goto("https://pollev.com/qainterview880")
    .then((res) => {
      return { status: res.status(200), message: "pollPage goto() success" };
    })
    .catch((err) =>
      console.log("pollPage goto() failed", {
        status: res.status(404),
        message: err,
      })
    );
  //   wait for component on page to be loaded (visible on DOM)
  await page.waitForSelector(
    ".component-response-multiple-choice__option__vote"
  );

  //   page.$$ function returns an array of ElementHandles for all elements that match the specified selector.
  //   const buttonParent = await page.$$(".component-response-multiple-choice__option__vote");

  //  console.log within page.evaluate doesn't print to the Node.js console directly. It logs to the browser's console in the context of the page.
  page.on("console", (msg) => {
    console.log("consoleLog:", msg.text());
  });
  await page.evaluate(() => {
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
    console.log(indexPosition, buttonsArr);

    // perform click function on button at random index
    buttonsArr[indexPosition].click();
  });

  //   ACCESS RESULTS WEBPAGE -> https://viz.polleverywhere.com/multiple_choice_polls/AxE2ULWiYsaGgmZ0Zundf

 const resultsPageResponse =  await page.goto(
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
    console.log(resultsPageResponse)

  //   multiple choice #id -> id="options_multiple_choice_poll_instance_28696495"
//   wait for poll results container to be visible on DOM
    await page.waitForSelector(
        "#options_multiple_choice_poll_instance_28696495"
    );

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

    // Access Neutral results
    await page.evaluate(() => {
        // html access elements on DOM with class
        const neutralResultsDiv = document.querySelector(
          "#poll_option_51559428"
        );
        const neutralTextDiv = document.querySelector(
            "#keyword_poll_option_51559428"
          );
        const neutralText = neutralTextDiv.nextElementSibling.innerText

        const neutralPercentageSpan = document.querySelector("#percent_label_poll_option_51559428").innerText

        console.log(neutralPercentageSpan.innerText, "neutral")
    })


  //close the browser window (end)
  await browser.close();
})();
