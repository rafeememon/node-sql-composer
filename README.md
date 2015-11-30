# node-sql-composer
Composable SQL template strings for Node.js

[![build status](https://img.shields.io/travis/rafeememon/node-sql-composer/master.svg)](https://travis-ci.org/rafeememon/node-sql-composer)
[![npm version](https://img.shields.io/npm/v/sql-composer.svg)](https://www.npmjs.com/package/sql-composer)

## Description

Programmatically constructing SQL queries is a tedious process when composing subqueries and collecting query parameters. This library utilizes [ES6 tagged template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings#Tagged_template_strings) to allow for easy parameterized query creation and composition.

## Usage

```js
import { sql, rawsql } from 'sql-composer';

// basic query
const query = sql`SELECT * FROM Users`;
expect(query).to.deep.equal({
  text: 'SELECT * FROM Users',
  values: []
});

// parameterized query
const userId = 1;
const query = sql`SELECT * FROM Users WHERE UserID = ${userId}`;
expect(query).to.deep.equal({
  text: 'SELECT * FROM Users WHERE UserID = ?',
  values: [1]
});

// query composition
const userId = 1;
const where = sql`WHERE UserID = ${userId}`;
const query = sql`SELECT * FROM Users ${where}`;
expect(query).to.deep.equal({
  text: 'SELECT * FROM Users WHERE UserID = ?',
  values: [1]
});

// raw string (not parameterized)
const table = rawsql('Users');
const query = sql`SELECT * FROM ${table}`;
expect(query).to.deep.equal({
  text: 'SELECT * FROM Users',
  values: []
});
```

## License

MIT
