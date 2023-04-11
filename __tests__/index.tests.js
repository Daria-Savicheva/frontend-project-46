import path, { dirname } from 'path';
import { fileURLToPath } from 'node:url';
import genDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diff two files', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const value = '{\n+  follow:false\n   host:hexlet.io\n+  proxy:123.234.53.22\n-  timeout:50\n+  timeout:20\n-  verbose:true\n}';
  expect(genDiff(path1, path2)).toEqual(value);
});
