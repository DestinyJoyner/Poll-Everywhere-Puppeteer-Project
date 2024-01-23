const request = require("supertest");
const app = require("../app.js");

// what to test?
// check that /poll?choice="value" -> returns same value, checks results object
describe("GET /poll", () => {
  describe("given no choice query option", () => {
    // respond with 200 status
    test("should respond with 200 status code", async () => {
      const response = await request(app).get("/poll");
      expect(response.statusCode).toBe(200);
    });
    // respond with json in content type header
    test("should specify JSON in content-type header", async () => {
      const response = await request(app).get("/poll");
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    // respond with an object {choice: "", results: {}}
    test("should return object with results key and choice key", async () => {
      const response = await request(app).get("/poll");
      expect(response.body).toHaveProperty("choice");

      expect(response.body).toHaveProperty("results");
    });
  });
});

describe("GET poll/?choice=", () => {
  describe("gven a choice query value", () => {
    const queryValue = "neutral";

    test(`should return obj with choice property to have same value as ${queryValue}`, async () => {
      const response = await request(app).get(`/poll?choice=${queryValue}`);

      expect(response.statusCode).toBe(200);
      // expect choice property value to equal query value
      expect(response.body.choice.toLowerCase()).toBe(queryValue);
      expect(response.body).toHaveProperty("results");
    });
  });
});
