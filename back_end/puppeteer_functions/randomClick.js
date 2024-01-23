const puppeteer = require("puppeteer");

// function to go to poll page -> random click a button 

async function randomClick() {
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
    console.log(indexPosition, buttonsArr[indexPosition].innerText);
    const buttonClickValue = buttonsArr[indexPosition].innerText;

    // perform click function on button at random index
    buttonsArr[indexPosition].click();

    return buttonClickValue;
  });

  //close the browser window (end)
  await browser.close();

  //   return option clicked
  return buttonClickedPollPage;
}

module.exports = { randomClick };
