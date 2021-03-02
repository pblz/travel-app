
const fetch = require('node-fetch');

/* Functions for Fetching from API */
 const getWeather = async (lon,lat, baseUrl, apiKey) => {
    console.log("::: Fetching Weather :::")

    const url = baseUrl + 'forecast/daily?lat='+ lat + '&lon=' + lon + '&key=' + apiKey; 
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


 module.exports = getWeather
