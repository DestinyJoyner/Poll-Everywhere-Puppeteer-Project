const express = require("express");
const app = express();
const cors = require("cors");
const pollController = require("./controllers/pollController.js");

app.use(express.json());
app.use(cors());

app.use("/poll", pollController)

app.get("/", (req, res) => {
    res.status(200).send("<h1>Poll Everywhere Test Automation API</h1><span>Developed by : <a href='https://www.linkedin.com/in/destinyjoyner/' target='_blank'>Destiny Joyner</a> </span><p>This API uses Puppeteer for test automation between the following endpoints:</p><ul><li><code>/poll</code> - Random option click from <a href='https://pollev.com/qainterview880' target='_blank'>https://pollev.com/qainterview880</a></li><li><code>/poll?choice=</code> - Query with values <code>neutral</code>, <code>ramshackle</code>, <code>malevolent</code>, or <code>hearth</code> to click a specific option</li><li><code>/poll/results</code> - Receive the current results from <a href='https://viz.polleverywhere.com/multiple_choice_polls/AxE2ULWiYsaGgmZ0Zundf' target='_blank'>https://viz.polleverywhere.com/multiple_choice_polls/AxE2ULWiYsaGgmZ0Zundf</a></li></ul><p>Example usage:</p><p>// Random option click <br/> GET /poll <br/> // Click a specific option<br/>  GET /poll?choice=neutral <br/>// View current results <br/> GET /poll/results</p>")
})

app.get("*", (req,res) => {
    res.status(404).json({error: "Page not found"})
})

module.exports = app;