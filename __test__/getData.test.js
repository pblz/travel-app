import { getData } from "../src/client/js/getData"

describe("Testing the get functionality", () => {

    test('works ', async () => {

        await expect(() => {
            getData()
        })
            .not.toThrow();

    });
});
