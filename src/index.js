import { readFileSync } from 'fs';
import pkg from 'lodash';

function objToString(obj) {
  let str = '';
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  for (let i = 0; i < keys.length; i += 1) {
    str += `${keys[i]} :  ${values[i]}\n`;
  }

  return `{\n${str}}`;
}

const { keys, has, union } = pkg;

function getObjcetsCompared(object1, object2) {
  const keys1 = keys(object1);
  const keys2 = keys(object2);
  const unitedKeys = union(keys1, keys2).sort();
  const result = {};
  unitedKeys.forEach((key) => {
    if (has(object1, key) && !has(object2, key)) {
      result[` - ${key}`] = object1[key];
    } else if (has(object2, key) && !has(object1, key)) {
      result[` + ${key}`] = object2[key];
    } else if (object1[key] !== object2[key]) {
      result[` - ${key}`] = object1[key];
      result[` + ${key}`] = object2[key];
    } else {
      result[`   ${key}`] = object1[key];
    }
  });
  console.log(objToString(result));
}

export default function gendiff(filepath1, filepath2) {
  const dataFile1 = readFileSync(filepath1, 'utf8');
  const dataFile2 = readFileSync(filepath2, 'utf8');
  const parsedData1 = JSON.parse(dataFile1);
  const parsedData2 = JSON.parse(dataFile2);
  getObjcetsCompared(parsedData1, parsedData2);
}
