## Poll Everywhere Take Home Challenge

### Directions:
 Using a JavaScript  framework of your choice, such as puppeteer, selenium, or similar, please automate clicking on a vote from here:

https://pollev.com/qainterview880

And automate observing the response here.:

https://viz.polleverywhere.com/multiple_choice_polls/AxE2ULWiYsaGgmZ0Zundf

### Deployed Site
  - **Netlify Deployment**
    - [Access Live Site here](https://joynerd-poll-everywhere.netlify.app/)
  - **Render Deployment**
    - [Access API here](https://poll-everywhere-puppeteer-api.onrender.com)

  (*Due to the API being depolyed on Render's free tier service, there is an extended run time for the responses from the API, take this into consideration when accessing the Live Site. For faster runtime, run the server locally*)

### Project Overview

- **Project Description:**
  - This repository contains a client-side single webpage demonstrating the functionality of Puppeteer's framework.
  - The main goal is to automate testing and responses by accessing an original poll webpage.

- **User Choices:**
  - Users can choose either a random option or provide a specific response.

- **Displaying Results:**
  - Upon selecting a choice, the updated results from the results page are displayed to the user.

- **Status Codes:**
  - Status codes are included to represent whether the automated framework successfully accessed the webpages.

### Technologies Used

- **Languages:**
  - JavaScript
  - HTML
  - CSS

- **Framework/Library:**
  - Puppeteer
  - SuperTest

### Usage

- **Installation/Running the Project:**
  - Clone this repo 
  - Navigate to the cloned repository's directory on your command line. Then, run the following command:
```
npm install
```
This will install the libraries needed to run the tests.
```
cd back_end
npm install
npm start
```
This will start the back end Express Server

- **Testing with Supertest:**
  - The back end Express server includes Supertest test functions to check for:
    - Response codes
    - Expected response.body object properties and values
    - Testing for the content type in the headers response to be JSON.
  - Navigate to the back_end directory and run:
```
npm test
```
This will run all the test included.
  
- **Viewing the Client Side** (Choose One): 
  - Open Web View of the index.html file
  - Access the [Live Site here](https://joynerd-poll-everywhere.netlify.app/)

  
  






