async function handleClick(event) {
    event.preventDefault()
    console.log("::: Clicked :::")


    // Read the input from Destination and Date
    let formText = document.getElementById('destination').value;
    let dateInput = document.querySelector('input[type="date"]');
    let startDate = dateInput.value;
    console.log(formText); 
console.log(startDate); // prints "2017-06-01"
console.log(startDate.valueAsNumber); // prints 1496275200000, a JavaScript timestamp (ms)


    //HTML encode input so it's processable by the APIs


    const ans = await Client.getData('http://localhost:8081/weather') 
    
    .then(
        async function (weatherdata) {
            console.log(weatherdata);
        
        await Client.getData('http://localhost:8081/location')
        .then(
            async function (locData) {
                console.log(locData);

                await Client.getData('http://localhost:8081/pictures')

                .then(
                    async function (picdata) {
                        console.log(picdata)
                    });

        });
    });

}


export { handleClick }
