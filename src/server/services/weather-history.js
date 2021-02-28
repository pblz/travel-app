
const fetch = require('node-fetch');

/* Functions for Fetching from API */
 const getWeatherHistory = async (lon,lat, baseUrl, apiKey, date) => {
    console.log("::: Fetching Weather :::")

    /*/http://api.weatherbit.io/v2.0/history/daily
    &start_date=2021-02-24&end_date=2021-02-25
*/
    d = new Date (date);
    d2 = new Date (date);
    d.setFullYear(d.getFullYear()-3);
    d2.setDate((d2.getDate()+1));

    console.log(d);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

const da2 = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d2);
console.log(`${da}-${mo}-${ye}`);

const formattedDate = `${ye}-${mo}-${da}`;
const formattedDateEnd = `${ye}-${mo}-${da2}`;


    const url = baseUrl + 'history/daily?lat='+ lat + '&lon=' + lon + '&start_date='+ formattedDate +'&end_date='+ formattedDateEnd + '&key=' + apiKey;
    console.log(url);

    date +'&key=' + apiKey; 
    console.log(url);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    try {
        console.log('history');

        console.log(response);
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


 module.exports = getWeatherHistory
