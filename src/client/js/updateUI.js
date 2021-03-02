/* 
Fetch data from server side and update UI 
*/

function updateUI() {

    console.log("::: Process Input:::")

    // Get user input 
    let formText = document.getElementById('destination').value;
    let dateInput = document.querySelector('input[type="date"]');
    let startDate = new Date(dateInput.value);
    let jsonBody = {
        "keyword": formText,
    };

    let tripObject ={
        "destination" : formText,
        "date" : startDate
    }

    // Validate DestinationInput
    console.log("::: Validate Input:::")
    if (formText.length <= 1) {
        alert("Please enter a location first");
        return;
    }

    //Validate Date Input - only dates between today and the coming year are valid
    var today = new Date();
    const todayTime = today.getTime();
    const startDateTime = startDate.getTime();

    var diffTime = startDateTime - todayTime;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        alert("Please enter a date that is today or later!");
        return;
    }

    if (diffDays > 365) {
        alert("Please enter a date within this year!");
        return;
    }

    //Initialize Variables
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

                    // Get Historic Weather Data
                    await Client.postData('http://localhost:8081/history', historyJSON)
                        .then(
                            async function (weather) {
                                tmp = weather.data[0].temp;
                                weatherDescription = ("on this day in a previous year");
                            })

                } else {
                    // Get Forecast data (Day 0 of the forecast is the current weather)
                    await Client.postData('http://localhost:8081/weather', locData)
                        .then(
                            async function (weather) {
                                console.log(":::WEATHER :::")
                                tmp = weather.data[diffDays].temp;
                                weatherDescription = weather.data[diffDays].weather.description;
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
                
                // Weather Info
                const weatherDiv = document.createElement("div");
                weatherDiv.classList.add("weather");
                weatherDiv.innerHTML = "Weather Forecast : " + weatherDescription + "  " + tmp + " °C";
                const buttonContainer = document.createElement("div");
                
                // Container for Save button
                buttonContainer.classList.add('result-form');
                const buttonSave = document.createElement("button");
                buttonSave.innerHTML = "Save trip";
                buttonSave.id = "save";
                const resultContainer = document.getElementById("results-container");
                resultContainer.innerHTML = "";
                resultContainer.classList.add("result-container");

                resultContainer.appendChild(weatherDiv);
                buttonContainer.appendChild(buttonSave);
                resultContainer.appendChild(buttonContainer);

                // Add listener to save trip upon click
                buttonSave.addEventListener('click', () => {
                    var storedTrips = JSON.parse(localStorage.getItem("trips"));
    
                    if(!storedTrips){
                        var trips = [];
                        localStorage.setItem('trips', JSON.stringify(trips));
                    }
                    storedTrips = JSON.parse(localStorage.getItem("trips"));
                    storedTrips.push(tripObject);
                    localStorage.setItem('trips', JSON.stringify(storedTrips));
                    alert("trip saved");
                  });


                //Fetch Pictures for location
                let tags = "";
                let picUrl = "";
                Client.postData('http://localhost:8081/pictures', jsonBody)

                    .then(
                        async function (picdata) {

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
                                resultBox.appendChild(picBox);
                            }
                        })
            });
}


export { updateUI }