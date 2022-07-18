import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (item, strLevel, runStylish) => {
  if (!_.isObject(item)) {
    return item;
  }
  const result = Object.entries(item)
    .map(([key, value]) => runStylish({ action: 'save', value, name: key }, strLevel))
    .join('\n');
  return `{\n${result}\n${indent(strLevel - 1)}  }`;
};

const stylish = (node, level = 0) => {
  const { name } = node;
  const levelUp = level + 1;
  switch (node.action) {
    case 'root':
      return `{\n${node.children
        .map((child) => stylish(child, levelUp))
        .join('\n')}\n}`;

    case 'nested': {
      const strings = node.children
        .map((child) => stylish(child, levelUp))
        .join('\n');
      return `${indent(level)}  ${name}: {\n${strings}\n${indent(level)}  }`;
    }

    case 'updated': {
      const strDel = `${indent(level)}- ${name}: ${stringify(
        node.value1,
        levelUp,
        stylish,
      )}`;
      const strAdd = `${indent(level)}+ ${name}: ${stringify(
        node.value2,
        levelUp,
        stylish,
      )}`;
      return `${strDel}\n${strAdd}`;
    }

    case 'added':
      return `${indent(level)}+ ${name}: ${stringify(
        node.value,
        levelUp,
        stylish,
      )}`;

    case 'removed':
      return `${indent(level)}- ${name}: ${stringify(
        node.value,
        levelUp,
        stylish,
      )}`;

    case 'save':
      return `${indent(level)}  ${name}: ${stringify(
        node.value,
        levelUp,
        stylish,
      )}`;

    default:
      throw Error(`This if invalid is ${node.action}`);
  }
};

export default stylish;
