/* eslint-disable no-underscore-dangle */
import path, { dirname } from 'path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getReadFile = (file) => {
  const filePath = getFixturePath(file);
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
};

const firstJSON = getFixturePath('file1.json');
const secondJSON = getFixturePath('file2.json');
const firstYML = getFixturePath('file1.yml');
const secondYML = getFixturePath('file2.yml');

const expectedStylish = getReadFile('resultStylish.txt').trim();
// const expectedPlain = getReadFile('resultPlain.txt').trim();
// const expectedJSON = getReadFile('resultJSON.txt').trim();

test('#1 difference stylish format test between JSON files', () => {
  expect(genDiff(firstJSON, secondJSON, 'stylish')).toEqual(expectedStylish);
});

test('#2 difference stylish format test between YML files', () => {
  expect(genDiff(firstYML, secondYML, 'stylish')).toEqual(expectedStylish);
});
