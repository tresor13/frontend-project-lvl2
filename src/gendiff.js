import { readFileSync } from "fs";
import pkg from "lodash";
import yaml from "js-yaml";

function objToString(obj) {
  let str = "";
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  for (let i = 0; i < keys.length; i += 1) {
    str += `${keys[i]}: ${values[i]}\n`;
  }

  return `{\n${str}}`;
}

const { keys, has, union, last, isObject, sortBy, isEqual } = pkg;

function parsers(filePath) {
  const fileExtension = last(filePath.split(".")).toLowerCase();
  if (fileExtension === "json") {
    return JSON.parse(readFileSync(filePath, "utf8"));
  }
  if (fileExtension === "yaml" || fileExtension === "yml") {
    return yaml.load(readFileSync(filePath, "utf8"));
  }
  return console.error("Unknown file format");
}

// function getObjcetsCompared(object1, object2) {

//   const keys1 = keys(object1);
//   const keys2 = keys(object2);
//   const unitedKeys = union(keys1, keys2).sort();
//   const result = {};
//   unitedKeys.forEach((key) => {
//     if (has(object1, key) && !has(object2, key)) {
//       result[`  - ${key}`] = object1[key];
//     } else if (has(object2, key) && !has(object1, key)) {
//       result[`  + ${key}`] = object2[key];
//     } else if (object1[key] !== object2[key]) {
//       result[`  - ${key}`] = object1[key];
//       result[`  + ${key}`] = object2[key];
//     } else {
//       result[`    ${key}`] = object1[key];
//     }
//   });
//   return objToString(result);
// }
const diff = (file1, file2) => {
  const iter = (node1, node2) => {
    const commonKeys = sortBy(union(keys(node1), keys(node2)));
    const result = commonKeys.map((key) => {
      if (!has(node1, key)) {
        return {
          name: key,
          sign: "+",
          action: "added",
          value: node2[key],
        };
      }
      if (!has(node2, key)) {
        return {
          name: key,
          sign: "-",
          action: "removed",
          value: node1[key],
        };
      }
      if (isObject(node1[key]) && isObject(node2[key])) {
        return {
          name: key,
          sign: " ",
          type: "dir",
          children: iter(node1[key], node2[key]),
        };
      }
      if (!isEqual(node1[key], node2[key])) {
        return {
          name: key,
          add: "+",
          del: "-",
          action: "updated",
          value1: node1[key],
          value2: node2[key],
        };
      }
      return {
        name: key,
        sign: " ",
        action: "save",
        value: node1[key],
      };
    });
    return result;
  };
  return { name: "tree", children: iter(file1, file2) };
};

export default function gendiff(filepath1, filepath2) {
  const parsedData1 = parsers(filepath1);
  const parsedData2 = parsers(filepath2);
  return diff(parsedData1, parsedData2);
}

// function getObjcetsCompared(object1, object2) {
//   const keys = union(keys(object1), keys(object2)).sort();
//   const iter = (node1, node2) => {
//   if (!isObject(node1) && !isObject(node2) ) {
//     keys.forEach((key) =>{
//       if (has(object1, key) && !has(object2, key)) {
//         return `  - ${key} = ${object1[key]}`;
//       }
//       else if (has(object2, key) && !has(object1, key)) {
//           return `  + ${key} = ${object2[key]}`;
//         }
//       else if (object1[key] !== object2[key]) {
//           return `  - ${key} = ${object1[key]} \n   + ${key}= ${object2[key]}`;
//         }
//       else {
//           return `    ${key} = ${object1[key]}`;
//         }
//     });
//   }
//   const result = Object.entries(node).map(
//     ([key, value]) => `${sub}${key}: ${iter(value, level + 1)}`
//   );
//   return ["{", ...result, `${prit.repeat(level - 1)}}`].join("\n");
// };
// return iter(tree, 1);
