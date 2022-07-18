import path from "path";
import * as fs from "fs";
import diff from "./diff.js";
import formatter from "./formatters/formatter.js";
import parser from "./funcParse.js";

const extractData = (way) => {
  const format = path.extname(way);
  const obj = fs.readFileSync(way, "utf-8");
  return parser(obj, format);
};

const gendiff = (file1, file2, format = "stylish") => {
  const data1 = extractData(file1);
  const data2 = extractData(file2);
  const callDiff = diff(data1, data2);
  return formatter(callDiff, format);
};
export default gendiff;
