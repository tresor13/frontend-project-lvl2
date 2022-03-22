//import { test, expect } from "@jest/globals";
const gendiff = require("../src/gendiff.js");
import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

test("gendiff Test", () => {
  const JSONfile1 = getFixturePath("file1.json");
  const JSONfile2 = getFixturePath("file2.json");
  const expected = readFileSync(getFixturePath("expected.txt"), "utf-8");

  expect(gendiff(JSONfile1, JSONfile2)).toBe(expected);
});
