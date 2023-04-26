import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parse.js';
import compareData from './compareDate.js';
import getFormat from './formates/index.js';

const bildPath = (way) => path.resolve(process.cwd(), way);

const genDiff = (path1, path2, formatName = 'stylish') => {
  const absolutePath1 = bildPath(path1);
  const absolutePath2 = bildPath(path2);

  const getData1 = fs.readFileSync(absolutePath1, 'utf-8');
  const getData2 = fs.readFileSync(absolutePath2, 'utf-8');

  const data1 = parser(getData1);
  const data2 = parser(getData2);

  const differences = getFormat(compareData(data1, data2), formatName);
  return differences;
};

export default genDiff;
