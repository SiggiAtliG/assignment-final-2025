# eslint-plugin-no-moment

ESLint plugin that forbids the use of moment.js

## Installation

```bash
npm install eslint-plugin-no-moment --save-dev
```

## Usage

Add `no-moment` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["no-moment"]
}
```

Then configure the rule in the rules section:

```json
{
  "rules": {
    "no-moment/no-moment": "error"
  }
}
```

Or you can use the recommended configuration:

```json
{
  "extends": ["plugin:no-moment/recommended"]
}
```

## Rules

### no-moment/no-moment

This rule disallows the use of moment.js in your codebase. Moment.js is a large library that is no longer recommended for new projects. Instead, consider using alternatives like date-fns or the upcoming Temporal API.

Examples of incorrect code for this rule:

```js
import moment from 'moment';
const moment = require('moment');
```

Examples of correct code for this rule:

```js
import { format } from 'date-fns';
```

## Why avoid moment.js?

- Moment.js is a large library (~70KB)
- It mutates dates in-place, which can lead to bugs
- It's not tree-shakable
- It's no longer actively developed
- There are better alternatives available (date-fns, Temporal API) 