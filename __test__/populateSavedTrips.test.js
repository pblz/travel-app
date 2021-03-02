import { populateSavedTrips } from "../src/client/js/populateSavedTrips"

describe("Testing populateSavedTrips", () => {

    //SETUP mocks for empty local storage and 
    //stored trips
    const localStorageMockEmtpyTrips = {
        getItem: function(key) {
            return "{}"
          },
        setItem: jest.fn(),
        clear: jest.fn()
      };

      var trip = {
          "destination" : "Paris",
          "date" : new Date()
      }
      var trips = [];
      trips.push(trip);

      const stringifiedTrips = JSON.stringify(trips);

      const localStorageMockTrips = {
        getItem: function(key) {
            return stringifiedTrips;
          },
        setItem: jest.fn(),
        clear: jest.fn()
      };

    test('For empty trips object', async () => {
        global.localStorage = localStorageMockEmtpyTrips;

        // Set up our document body
        document.body.innerHTML =
            '<div>' +
            '  <div id="mytrips">DummyText</div>' +
            '  <div class=""main-text"">Text</div>' +
            '</div>';

        //Output: Check if the UI is updated correctly
        await populateSavedTrips();
        expect(document.getElementById("mytrips").innerHTML).toEqual("");


    });

    test('For pre-filled valid trips object', async () => {
        global.localStorage = localStorageMockTrips;

        // Set up our document body
        document.body.innerHTML =
            '<div>' +
            '  <div id="mytrips">DummyText</div>' +
            '  <div class=""main-text"">Text</div>' +
            '</div>';

        //Output: Check if the UI is updated correctly
        await populateSavedTrips();
        expect(document.getElementsByClassName("card-holder")[0]).not.toBeNull();
        expect(document.getElementsByClassName("insp-info")[0]).not.toBeNull();


    });

});