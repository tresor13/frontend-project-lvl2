import { expect, test } from "@jest/globals";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import * as fs from "fs";
import gendiff from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const readFile = (filename) => fs.readFileSync(filename, "utf-8");

const expectStylish = readFile(getFixturePath("stylish.expect.txt"));
const expectPlain = readFile(getFixturePath("plain.expect.txt"));

test.each(["yaml", "json"])("Test format stylish (%s, %s)", (ext) => {
  expect(
    gendiff(
      getFixturePath(`file1.${ext}`),
      getFixturePath(`file2.${ext}`),
      "stylish"
    )
  ).toBe(expectStylish);

  expect(
    gendiff(
      getFixturePath(`file1.${ext}`),
      getFixturePath(`file2.${ext}`),
      "plain"
    )
  ).toBe(expectPlain);

  expect(
    gendiff(getFixturePath(`file1.${ext}`), getFixturePath(`file2.${ext}`))
  ).toBe(expectStylish);
});
