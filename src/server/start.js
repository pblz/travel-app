const app = require('./server.js')

// designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
    console.log(`Example app listening on http://localhost:${port}!`);
})
