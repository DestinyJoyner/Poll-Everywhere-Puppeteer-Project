const API = "http://localhost:3001";
// runs faster locally
// "https://poll-everywhere-project.onrender.com";

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

  
  


  export {
    fetchResults,
    fetchRandom,
  }