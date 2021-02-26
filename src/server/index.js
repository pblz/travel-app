var path = require('path')
const express = require('express')
const fetch = require('node-fetch');
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv');
const getWeather = require('./services/weather.js')
const config = require('./config')
const getLocation = require('./services/geocode')
const pixabay = require('./services/pixabay')

dotenv.config();
const WEATHERBIT_APIKEY = process.env.WEATHERBIT_APIKEY;
const weatherUrl = 'https://api.weatherbit.io/v2.0/';
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const geonamesUrl = 'http://api.geonames.org/';
const PIXABAY_APIKEY = process.env.PIXABAY_APIKEY;
console.log(PIXABAY_APIKEY);
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

console.log(__dirname)


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
    console.log(`Example app listening on http://localhost:${port}!`);
})


app.get('/weather', async function (req, res) {
    try {
        const weather = await getWeather(-78.6382, 35.7796, weatherUrl, WEATHERBIT_APIKEY);
        return res.send(weather);
    } catch (error) {
        console.log("error", error);
    }
    res.send("error")
})


app.get('/location', async function (req, res) {
    try {
        const city = 'Stuttgart';
        const lonlat = await getLocation(city, geonamesUrl, GEONAMES_USERNAME );
        return res.send(lonlat);
    } catch (error) {
        console.log("error", error);
    }
    res.send("error")
})

app.get('/pictures', async function (req, res) {
    try {
        const keyword = 'Stuttgart';
        const ans = await pixabay(keyword, pixabayUrl, PIXABAY_APIKEY );
        return res.send(ans);
    } catch (error) {
        console.log("error", error);
    }
    res.send("error")
})

app.post('/pictures', async function (req, res) {
    try {
        const keyword = req.body.keyword;
        const ans = await pixabay(keyword, pixabayUrl, PIXABAY_APIKEY );
        return res.send(ans);
    } catch (error) {
        console.log("error", error);
    }
    res.send("error")
})


app.post('/weather', function (req, res) {
    res.json(weather());
})
