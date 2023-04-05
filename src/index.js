import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const bildPath = (way) => path.resolve(process.cwd(), way);

const genDiff = (path1, path2) => {
  const absolutePath1 = bildPath(path1);
  const absolutePath2 = bildPath(path2);

  const getData1 = fs.readFileSync(absolutePath1, 'utf-8');
  const getData2 = fs.readFileSync(absolutePath2, 'utf-8');

  const data1 = JSON.parse(getData1);
  const data2 = JSON.parse(getData2);

  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  let result = '';
  console.log('{');
  for (const key of sortedKeys) {
    if (!Object.hasOwn(data2, key)) {
      result = `- ${[key]}: ${data1[key]}`;
      console.log(result);
    } else if (!Object.hasOwn(data1, key)) {
      result = `+ ${[key]}: ${data2[key]}`;
      console.log(result);
    } else if (data1[key] !== data2[key]) {
      result = `- ${[key]}: ${data1[key]}`;
      console.log(result);
      result = `+ ${[key]}: ${data2[key]}`;
      console.log(result);
    } else {
      result = `  ${[key]}: ${data2[key]}`;
      console.log(result);
    }
  }
  return '}';
};

export default genDiff;
