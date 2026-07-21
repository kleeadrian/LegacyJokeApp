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

  it("has a well-formed shape for every joke", () => {
    for (const joke of jokes) {
      assert.equal(typeof joke.id, "number");
      assert.ok(joke.setup.length > 0);
      assert.ok(joke.punchline.length > 0);
    }
  });

  it("has unique ids", () => {
    const ids = jokes.map((joke) => joke.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  it("always returns a valid joke across many calls", () => {
    const validIds = new Set(jokes.map((joke) => joke.id));
    for (let i = 0; i < 100; i += 1) {
      assert.ok(validIds.has(getRandomJoke().id));
    }
  });
});
