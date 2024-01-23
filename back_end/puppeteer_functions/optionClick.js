const puppeteer = require("puppeteer");

// function selects sepcific value of button to click (str -> neutral, ramshackle, hearth, malevolent)

async function specificOptionClick(choiceVal) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

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

  page.on("console", (msg) => {
    console.log("consoleLog:", msg.text());
  });

  // pass parameter by using second argument in page.evaluate b/c it runs in the context of the browser page, and it doesn't have direct access to variables from the Node.js environment.
  const buttonClickedPollPage = await page.evaluate((choiceVal) => {
    const buttons = document.querySelectorAll(
      ".component-response-multiple-choice__option__vote"
    );
    // for specific button, filter out based on innerText of element
    const button = [...buttons].filter(
      (el) => el.innerText.toLowerCase() === choiceVal
    );
    // perform click on returned button element
    button[0].click();
    // return inner Text value of button clicked
    return button[0].innerText;
  }, choiceVal);

  //close the browser window (end)
  await browser.close();

  //   return obj with option clicked -> jest test for vale inputted here to === val returned??
  return buttonClickedPollPage;
}

module.exports = { specificOptionClick };
