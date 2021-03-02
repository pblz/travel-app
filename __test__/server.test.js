
const app = require("../src/server/index.js");
const request = require("supertest");

describe("Testing express server", () => {

    test("Respond to root get", done => {
        request(app)
          .get("/")
          .then(response => {
            expect(response.statusCode).toBe(200);
            done();
          });
      });

      test("Respond to post Weather", done => {
        request(app)
          .post("/weather")
          .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toEqual('application/json');
            done();
          });
      });
});

