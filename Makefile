install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js

test-coverage:
	npm test -- --coverage --coverageProvider=v8