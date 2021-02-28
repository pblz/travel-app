
const fetch = require('node-fetch');

/* Functions for Fetching from API */
 const getWeather = async (lon,lat, baseUrl, apiKey) => {
    console.log("::: Fetching Weather :::")

    /*//https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely
//https://www.weatherbit.io/static/img/icons/r01d.png

https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=fd91db15db99468cb2538a7dd8544b48
*/
    const url = baseUrl + 'forecast/daily?lat='+ lat + '&lon=' + lon + '&key=' + apiKey; 
    console.log(url);

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
