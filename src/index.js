import path from "path";
import * as fs from "fs";
import compareFiles from "./compareFiles.js";
import formatter from "./formatters/formatter.js";
import parser from "./parser.js";

const extractData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const format = path.extname(filepath).slice(1);
  const obj = fs.readFileSync(absolutePath, "utf-8");
  return parser(obj, format);
};

const gendiff = (file1, file2, format = "stylish") => {
  const data1 = extractData(file1);
  const data2 = extractData(file2);
  const callDiff = compareFiles(data1, data2);
  return formatter(callDiff, format);
};

export default gendiff;
