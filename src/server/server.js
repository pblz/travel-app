var path = require('path')
const express = require('express')
const fetch = require('node-fetch');
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv');
const getWeather = require('./services/weather.js')
const getWeatherHistory = require('./services/weather-history.js')
const config = require('./config')
const getLocation = require('./services/geocode')
const pixabay = require('./services/pixabay')

dotenv.config();
const WEATHERBIT_APIKEY = process.env.WEATHERBIT_APIKEY;
const weatherUrl = 'https://api.weatherbit.io/v2.0/';
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const geonamesUrl = 'http://api.geonames.org/';
const PIXABAY_APIKEY = process.env.PIXABAY_APIKEY;
const pixabayUrl = 'https://pixabay.com/api/';



const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

//Routes
app.use(require('./routes'));

const errorObj = {"message": "error"};

/* 
Define Storage Object 
*/
var favorites = [];

/* 
Configure Routes
*/

/* POST Route 
- add entry to project endpoint */
app.post('/favorite', addFavorite);

app.post('/weather', async function (req, res) {
    try {
        const lng = req.body.lng;
        const lat = req.body.lat;
        const weather = await getWeather(lng, lat, weatherUrl, WEATHERBIT_APIKEY);
        return res.send(weather);
    } catch (error) {
        console.log("error", error);
    }
    res.send(errorObj)
})

app.post('/history', async function (req, res) {
    try {
        const lng = req.body.lng;
        const lat = req.body.lat;
        const date = req.body.date;
        const weather = await getWeatherHistory(lng, lat, weatherUrl, WEATHERBIT_APIKEY,date);
        return res.send(weather);
    } catch (error) {
        console.log("error", error);
    }
    res.send(errorObj)
})

app.post('/location', async function (req, res) {
    try {
        const city = req.body.keyword;
        const data = await getLocation(city, geonamesUrl, GEONAMES_USERNAME );

        return res.json(data.geonames[0]);
    } catch (error) {
        console.log("error", error);
    }
    res.send(errorObj)
})

app.get('/pictures', async function (req, res) {
    try {
        const keyword = 'Stuttgart';
        const ans = await pixabay(keyword, pixabayUrl, PIXABAY_APIKEY );
        return res.send(ans);
    } catch (error) {
        console.log("error", error);
    }
    res.send(errorObj)
})

app.post('/pictures', async function (req, res) {
    try {
        const keyword = req.body.keyword;
        const ans = await pixabay(keyword, pixabayUrl, PIXABAY_APIKEY );
        return res.send(ans);
    } catch (error) {
        console.log("error", error);
    }
    res.send(errorObj)
})

function addFavorite(req, res) {
    console.log("received favorite");
    favorites.push(req.body);
};


module.exports = app
