install: install-deps
	npx simple-git-hooks

publish:
	npm publish --dry-run

lint:
	npx eslint .

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8