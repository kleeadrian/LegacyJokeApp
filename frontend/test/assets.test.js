import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

describe("frontend assets", () => {
  it("includes required static files", async () => {
    const files = ["index.html", "styles.css", "app.js"];

    for (const file of files) {
      const filePath = path.join(publicDir, file);
      const content = await fs.readFile(filePath, "utf8");
      assert.ok(content.length > 0);
    }
  });
});
