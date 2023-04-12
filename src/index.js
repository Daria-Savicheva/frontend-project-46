import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parse.js';

const bildPath = (way) => path.resolve(process.cwd(), way);

const genDiff = (path1, path2) => {
  const absolutePath1 = bildPath(path1);
  const absolutePath2 = bildPath(path2);

  const getData1 = fs.readFileSync(absolutePath1, 'utf-8');
  const getData2 = fs.readFileSync(absolutePath2, 'utf-8');

  const data1 = parser(getData1);
  const data2 = parser(getData2);

  const last = _.union(Object.keys(data1), Object.keys(data2));
  const final = _.sortBy(last);

  // eslint-disable-next-line array-callback-return, consistent-return
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

  return (`{\n${result.join('\n')}\n}`);
};

export default genDiff;
