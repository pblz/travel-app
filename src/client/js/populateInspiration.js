/* Fetch pics from server side and update UI */


function updatePics() {
    console.log("::: Validate Input:::")
    let formText = document.getElementById('destination').value;


    let dateInput = document.querySelector('input[type="date"]');
    let startDate = new Date(dateInput.value);

    if (formText.length <= 1) {
        alert("Please enter a location first");
        return;
    }

    //Validate inputs:
    var today = new Date();
    const todayTime = today.getTime();
    const startDateTime = startDate.getTime();

    var diffTime = startDateTime - todayTime;

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffTime + " milliseconds");
    console.log(diffDays + " days");

    if (diffDays < 0) {
        alert("Please enter a date that is today or later!");
        return;
    }

    if(diffDays > 365) {
        alert("Please enter a date within this year!");
        return;
    }


    let jsonBody = {
        "keyword": formText,
    };

    let lng = 0;
    let lat = 0;
    let tmp = 0;
    let weatherDescription = "";
    console.log("::: Fetch location :::")

    Client.postData('http://localhost:8081/location', jsonBody)
        .then(

            async function (locData) {
                console.log(locData);
                lng = locData.lng;
                lat = locData.lat;

                //TODO
                let weatherText = "";

                if (diffDays > 16) {
                    console.log(":::WEATHER HISTORY:::")
                    let historyJSON = {
                        "lng": locData.lng,
                        "lat": locData.lat,
                        "date": startDate,
                    };

                    await Client.postData('http://localhost:8081/history', historyJSON)
                        .then(
                            async function (weather) {
                                console.log(":::WEATHER :::")
                                console.log(weather.data);

                                tmp = weather.data[0].temp;
                                //weatherDescription = weather.data[0].weather.description;
                                console.log(tmp);
                                //console.log(weatherDescription);
                                weatherDescription = ("on this day in a previous year");

                            })
                    
                } else {
                    await Client.postData('http://localhost:8081/weather', locData)
                        .then(
                            async function (weather) {
                                console.log(":::WEATHER :::")
                                console.log(weather.data);

                                tmp = weather.data[diffDays].temp;
                                weatherDescription = weather.data[diffDays].weather.description;
                                console.log(tmp);
                                console.log(weatherDescription);

                            })
                        }
                    console.log("::: Update UI:::")

                    // Set section with class pic to invisible for now
                    const picBox = document.getElementsByClassName("pic")[0];
                    picBox.innerHTML = "";
                    picBox.classList.remove("pic");


                    // Update class=maintext 
                    const mainBox = document.getElementsByClassName("main-text")[0];
                    mainBox.innerHTML = "See what is waiting for you in " + formText + " in " + diffDays + " days:";
                    const weatherDiv = document.createElement("div");
                    weatherDiv.classList.add("weather");
                    console.log(tmp);
                    console.log(weatherDescription);
                    weatherDiv.innerHTML = "Weather Forecast : " + weatherDescription + "  " + tmp + " °C";
                    const buttonContainer = document.createElement("div");
                    buttonContainer.classList.add('result-form');
                    const buttonSave = document.createElement("button");
                    buttonSave.innerHTML = "Save trip";
                    const buttonNewSearch = document.createElement("button");
                    buttonNewSearch.id = "new";
                    buttonNewSearch.addEventListener('click', Client.triggerReload);
                    buttonNewSearch.innerHTML = "Plan another";
                    const resultContainer = document.getElementById("results-container");
                    resultContainer.innerHTML = "";
                    resultContainer.classList.add("result-container");
                    resultContainer.appendChild(weatherDiv);
                    buttonContainer.appendChild(buttonSave);
                    buttonContainer.appendChild(buttonNewSearch);
                    resultContainer.appendChild(buttonContainer);
                //CLOSE ELSE


                let tags = "";
                let picUrl = "";
                Client.postData('http://localhost:8081/pictures', jsonBody)

                    .then(
                        async function (picdata) {
                            console.log(picdata);
                            console.log(picdata.hits[0].webformatURL);
                            console.log(picdata.hits[0].tags);


                            // Save result button
                            // Add new search button

                            const resultBox = document.getElementById("results");
                            resultBox.innerHTML = "";

                            for (const p of picdata.hits) {
                                picUrl = p.webformatURL;
                                tags = p.tags;

                                const picBox = document.createElement("div");
                                picBox.classList.add("results-box");
                                var myImage = new Image(100, 200);
                                myImage.src = picUrl;
                                picBox.innerHTML = tags;
                                picBox.appendChild(myImage);
                                console.log(picBox);
                                resultBox.appendChild(picBox);
                            }



                        })

            });

}


export { updatePics }