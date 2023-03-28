import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (path1, path2) => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path1), 'utf-8'));
  // const data1 = getData(bildPath(path1))
  const data2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path2), 'utf-8'));
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  for (const key of sortedKeys) {
    if (data1.hasOwnProperty(key) && !data2.hasOwnProperty(key)) {
      let result = `${result}\n- ${[key]}: ${data1[key]}`;
    }
  }
  return result;
};

export default genDiff;
