
/*

http://api.geonames.org/searchJSON?q=Stuttgart&maxRows=1&username=

*/

const fetch = require('node-fetch');


 const getLocation = async (destination, baseUrl, username) => {
    console.log("::: Fetching Weather :::")

    const url = baseUrl + 'searchJSON?q=' + destination + '&maxRows=1&username=' + username;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    try {
        console.log(response);
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

 module.exports = getLocation
