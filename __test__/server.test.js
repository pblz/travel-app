
const app = require('../src/server/server.js')
const supertest = require('supertest')
const request = supertest(app)

describe("Testing express server", () => {

  test("Respond to root get", async done => {
    const response = await request.get('/')
    expect(response.statusCode).toBe(200);
    done();
  });

  test("Respond to weather post", async done => {
    const response = await request.post('/weather')
    expect(response.statusCode).toBe(200);
    done();
  });
});


