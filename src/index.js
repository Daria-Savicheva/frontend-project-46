import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import compareData from './compareDate.js';
import getFormat from './formates/index.js';

const bildPath = (way) => path.resolve(process.cwd(), way);

const genDiff = (path1, path2, formatName = 'stylish') => {
  const absolutePath1 = bildPath(path1);
  const absolutePath2 = bildPath(path2);

  const getData1 = fs.readFileSync(absolutePath1, 'utf-8');
  const getData2 = fs.readFileSync(absolutePath2, 'utf-8');

  const data1 = JSON.parse(getData1);
  const data2 = JSON.parse(getData2);

  const last = _.union(Object.keys(data1), Object.keys(data2));
  const final = _.sortBy(last);

  const result = final.map((index) => {
    if (!Object.hasOwn(data1, index)) {
      return `-  ${index}:${data2[index]}`;
    }
    if (!Object.hasOwn(data2, index)) {
      return `+  ${index}:${data1[index]}`;
    }
    if (data1[index] !== data2[index]) {
      return (`-  ${index}:${data1[index]}\n+  ${index}:${data2[index]}`);
    }
    if (data1[index] === data2[index]) {
      return `   ${index}:${data1[index]}`;
    }
  });

  //const differences = getFormat(compareData(data1, data2), formatName);
  //return differences;
  return (`{\n${result.join('\n')}\n}`);
};

export default genDiff;
