import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { jokes, getRandomJoke } from "../src/jokes.js";

describe("jokes", () => {
  it("contains at least one joke", () => {
    assert.ok(jokes.length > 0);
  });

  it("returns a joke from the collection", () => {
    const joke = getRandomJoke();
    assert.ok(jokes.some((item) => item.id === joke.id));
    assert.equal(typeof joke.setup, "string");
    assert.equal(typeof joke.punchline, "string");
  });
});
