import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

test('is work 1', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual('}');
});
