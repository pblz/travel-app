/* Fetch pics from server side and update UI */


function updatePics() {
    console.log("::: Update Pictures :::")

    // Read the input from Destination and Date
    let formText = 'Berlin';
    //formText = document.getElementById('destination').value;
    let tags = "";
    let picUrl = "";
    Client.getData('http://localhost:8081/pictures')


        .then(
            async function (picdata) {
                console.log(picdata);
                console.log(picdata.hits[0].webformatURL);
                console.log(picdata.hits[0].tags);

                // Set section with class pic to invisible for now
                // Update class=maintext 
                
                // Save result button
                // Add new search button

                const resultBox = document.getElementById("results");
                const title = document.createElement("div");
                title.innerHTML = "See what is waiting for you in";

                resultBox.appendChild(title);

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