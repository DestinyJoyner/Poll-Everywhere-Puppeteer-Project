const API = "https://poll-everywhere-puppeteer-api.onrender.com";
// runs faster locally
// http://localhost:3001
// "https://poll-everywhere-puppeteer-api.onrender.com";

// fetch to results endpoint
const fetchResults = async () => {
    try {
      const fetchResponse = await fetch(`${API}/poll/results`);
      const resJson = await fetchResponse.json();
      return resJson;
    } catch (err) {
      console.error("Results fetch failed", err);
    }
  }

//   fetch for random click
const fetchRandom = async () => {
    try {
      const fetchResponse = await fetch(`${API}/poll`);
      const resJson = await fetchResponse.json();
      return resJson;
    } catch (err) {
      console.error("Random fetch failed", err);
    }
  }

//   fetch for specific button click
const fetchSpecific = async (buttonValue) => {
    try {
      const fetchResponse = await fetch(`${API}/poll?choice=${buttonValue}`);
      const resJson = await fetchResponse.json();
      return resJson;
    } catch (err) {
      console.error("Specific fetch failed", err);
    }
  }

  export {
    fetchResults,
    fetchRandom,
    fetchSpecific
  }