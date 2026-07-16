import { describe, it } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import app from "../src/app.js";

function request(path) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address();

      http.get(`http://127.0.0.1:${port}${path}`, (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          server.close();
          resolve({
            status: res.statusCode,
            body: JSON.parse(body)
          });
        });
      }).on("error", (error) => {
        server.close();
        reject(error);
      });
    });
  });
}

describe("API routes", () => {
  it("returns health status", async () => {
    const response = await request("/api/health");
    assert.equal(response.status, 200);
    assert.equal(response.body.status, "ok");
    assert.equal(response.body.runtime, "node-26");
  });

  it("returns all jokes", async () => {
    const response = await request("/api/jokes");
    assert.equal(response.status, 200);
    assert.ok(response.body.count > 0);
    assert.ok(Array.isArray(response.body.jokes));
  });

  it("returns a random joke", async () => {
    const response = await request("/api/jokes/random");
    assert.equal(response.status, 200);
    assert.equal(typeof response.body.setup, "string");
    assert.equal(typeof response.body.punchline, "string");
  });
});
