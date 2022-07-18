import yaml from 'js-yaml';

const parser = (obj, format) => {
  switch (format) {
    case '.yaml':
      return yaml.load(obj);
    case '.yml':
      return yaml.load(obj);
    case '.json':
      return JSON.parse(obj);
    default:
      throw Error(`This if invalid is ${format}`);
  }
};
export default parser;
