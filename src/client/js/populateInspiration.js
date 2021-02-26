/* Fetch pics from server side and update UI */


function updatePics() {
    console.log("::: Update Pictures :::")

    // Read the input from Destination and Date
    let formText = document.getElementById('destination').value;
    let jsonBody = {
        'keyword': formText
    }

    // Set section with class pic to invisible for now

    const picBox = document.getElementsByClassName("pic")[0];
    picBox.innerHTML="";
    picBox.classList.remove("pic");

                // Update class=maintext 
                const mainBox = document.getElementsByClassName("main-text")[0];
                mainBox.innerHTML="See what is waiting for you in " + formText ;
                const weather = document.createElement("div");
                weather.classList.add("weather");
                weather.innerHTML="Weather Forecast : Sunny 35°C";

                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add('result-form');


                const buttonSave = document.createElement("button");
                buttonSave.innerHTML="Save trip";
                const buttonNewSearch = document.createElement("button");
                buttonNewSearch.id = "new";
                buttonNewSearch.addEventListener('click', Client.triggerReload);

                buttonNewSearch.innerHTML="Plan another";


                const resultContainer = document.getElementById("results-container");
                resultContainer.innerHTML="";
                resultContainer.classList.add("result-container");

                resultContainer.appendChild(weather);
                buttonContainer.appendChild(buttonSave);
                buttonContainer.appendChild(buttonNewSearch);
                resultContainer.appendChild(buttonContainer);
    //formText = document.getElementById('destination').value;
    let tags = "";
    let picUrl = "";
   // Client.getData('http://localhost:8081/pictures')
   Client.postData('http://localhost:8081/pictures',jsonBody)

        .then(
            async function (picdata) {
                console.log(picdata);
                console.log(picdata.hits[0].webformatURL);
                console.log(picdata.hits[0].tags);

                

                // Save result button
                // Add new search button

                const resultBox = document.getElementById("results");
                resultBox.innerHTML="";
                
              

                for (const p of picdata.hits){
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



}









/*Los Angeles
    <img src='https://cdn.pixabay.com/photo/2016/08/30/11/49/beach-1630458_960_720.jpg')>

            */








export { updatePics }