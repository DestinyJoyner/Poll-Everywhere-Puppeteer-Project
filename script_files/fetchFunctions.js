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
  
  


  export {
    fetchResults,
  }