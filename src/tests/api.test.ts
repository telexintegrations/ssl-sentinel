import { app, server } from "../index";
import supertest from "supertest";
import { describe, test, after } from "node:test";
import assert from "node:assert";
import { validHttpsUrl } from "../utils/validHttpsUrl";
import { checkSSL } from "../utils/checkSSL";
const api = supertest(app);

describe("telex SSL-Sentinel test", () => {
  describe("integration.json endpoint", () => {
    test("response with a valid telex json spec", async () => {
      const response = await api.get("/integration.json").expect(200);

      assert(response.body.data);
      assert(response.body.data.date);
      assert(response.body.data.descriptions);
      assert(response.body.data.settings);
      assert(response.body.data.tick_url);
    });
  });

  describe("tick endpoint", () => {
    test("tick works well and send the correct response", async () => {
      const payload = {
        channel_id: "test_channel",
        return_url: "https://www.example.com/telex",
        settings: [
          {
            label: "site-1",
            type: "text",
            required: true,
            default: "https://www.google.com",
          },
          {
            label: "site-2",
            type: "text",
            required: true,
            default: "https://www.apple.com",
          },
        ],
      };

      const response = await api
        .post("/tick")
        .send(payload)
        .expect(202)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.status, "SSL-Sentinel started");
    });
  });

  describe("validHttpsUrl", () => {
    test("validHttpsUrl - returns a valid URL object for correct HTTPS URLs", () => {
      assert.ok(validHttpsUrl("https://www.google.com") instanceof URL);
      assert.ok(validHttpsUrl("https://example.com") instanceof URL);
    });

    test("validHttpsUrl - returns null for invalid URLs", () => {
      assert.strictEqual(validHttpsUrl("invalid-url"), null);
      assert.strictEqual(validHttpsUrl("www.google.com"), null);
      assert.strictEqual(validHttpsUrl("http://example.com"), null);
    });

    test("validHttpsUrl - returns null for empty string", () => {
      assert.strictEqual(validHttpsUrl(""), null);
    });
  });

  describe("checkSSL", () => {
    test("checkSSL - valid HTTPS site", async () => {
      const site = "https://www.google.com";
      const result = await checkSSL(site);

      assert.match(
        result,
        /Issuer:/,
        "Should return valid SSL certificate details"
      );
    });
    test("checkSSL - invalid URL", async () => {
      const site = "invalid-url";
      const result = await checkSSL(site);

      assert(result.startsWith("Error:"));
    });

    test("checkSSL - HTTPS site without SSL (should fail)", async () => {
      const site = "https://expired.badssl.com";
      const result = await checkSSL(site);

      assert(result.startsWith("Error:"));
    });
  });

  after(() => {
    server.close();
  });
});
