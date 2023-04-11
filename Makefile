install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

install-deps:
	install ci