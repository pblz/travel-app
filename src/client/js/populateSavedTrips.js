/*
Get saved trips from localStorage and display in UI
*/

function populateSavedTrips(){

    //Get Element by ID
    var tripElement = document.getElementById("mytrips");
    
    // get trips from storage
    var storedTrips = JSON.parse(localStorage.getItem("trips"));

    if (!storedTrips){
        console.log("no trips");
        tripElement.innerHTML = "";
    }

    for (const trip of storedTrips){
        console.log(trip);
        const cardholder = document.createElement("div");
        cardholder.classList.add("card-holder");
        const inspinfo = document.createElement("p");
        inspinfo.classList.add("insp-info");

        var d = new Date (trip.date);

        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

        var formattedDate = `${da}-${mo}-${ye}`;
        inspinfo.classList.add("link");
        inspinfo.innerHTML = trip.destination + " " + formattedDate;

        inspinfo.addEventListener('click', Client.openTrip);
        cardholder.appendChild(inspinfo);
        tripElement.appendChild(cardholder);
    }
}

export { populateSavedTrips }