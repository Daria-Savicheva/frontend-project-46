import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (path1, path2) => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path1), 'utf-8'));
  // const data1 = getData(bildPath(path1))
  const data2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path2), 'utf-8'));
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  let result = '';
  for (const key of sortedKeys) {
    if (data1.hasOwnProperty(key) && !data2.hasOwnProperty(key)) {
      result = `- ${[key]}: ${data1[key]}`;
      console.log(result);
    } else if ((data1.hasOwnProperty(key) && data2.hasOwnProperty(key)) && data1[key] === data2[key]) {
      result = `  ${[key]}: ${data1[key]}`;
      console.log(result);
    } else if ((data1.hasOwnProperty(key) && data2.hasOwnProperty(key)) && data1[key] !== data2[key]){
      result = `- ${[key]}: ${data1[key]}`;
      console.log(result);
      result = `+ ${[key]}: ${data2[key]}`;
      console.log(result);
    } else {
      result = `+ ${[key]}: ${data2[key]}`;
    }
  }
  return result;
};

export default genDiff;
