const puppeteer = require("puppeteer");

async function accessResultsPage() {
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

  await page.waitForSelector("#options_multiple_choice_poll_instance_28696495");

  // console.log on results page
  page.on("console", (msg) => {
    console.log("consoleLog:", msg.text());
  });

  const pollResultsObj = await page.evaluate(() => {

    const resultOptionsIdArr = ["51559428", "51559429", "51559430", "51559431"];
    const pollResultsData = resultOptionsIdArr.reduce((acc, idVal) => {
      const elementTextDiv = document.querySelector(
        `#keyword_poll_option_${idVal}`
      );
      const elementText = elementTextDiv.nextElementSibling.innerText;
      const elementPercentageSpan = document.querySelector(
        `#percent_label_poll_option_${idVal}`
      ).innerText;
      acc[elementText] = elementPercentageSpan;
      return acc;
    }, {});

    return pollResultsData;
  });
  console.log(pollResultsObj, "results");

  await browser.close();

  return pollResultsObj
}

module.exports = accessResultsPage
