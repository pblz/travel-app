import { openTrip } from "../src/client/js/openTrip"
const EventEmitter = require('events');

//Test Suite
describe("Testing the openTrip functionality", () => {

    // Set up mock event
    global.alert = jest.fn();
    var event = new EventEmitter("click");
    event.target = jest.fn();
    Object.assign(event, { preventDefault: jest.fn() });

    //Window Alert Mock, to see if executed
    const alertMock = jest.spyOn(window, 'alert');

    //Test
    test('If openTrip is clicked, an alert is shown on window ', async () => {

        await expect(() => { openTrip(event) }).not.toThrow();
        expect(alertMock).toHaveBeenCalledTimes(1)
    });
});
