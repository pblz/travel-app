
const fetch = require('node-fetch');

/* Functions for Fetching from API */
 const pixabay = async (keyword, baseUrl, apiKey) => {
    console.log("::: Fetching Pics :::")

    const url = baseUrl + '?q='+ keyword + '&image_type=photo&per_page=20&key=' + apiKey; 
    console.log(url);

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


module.exports = pixabay
