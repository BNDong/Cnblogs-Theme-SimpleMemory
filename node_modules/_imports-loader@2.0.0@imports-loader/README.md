<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# imports-loader

The imports loader allows you to use modules that depend on specific global variables.

This is useful for third-party modules that rely on global variables like `$` or `this` being the `window` object.
The imports loader can add the necessary `require('whatever')` calls, so those modules work with webpack.

For further hints on compatibility issues, check out [Shimming](https://webpack.js.org/guides/shimming/) of the official docs.

> ⚠ By default loader generate ES module named syntax.

> ⚠ Be careful, existing imports (`import`/`require`) in the original code and importing new values can cause failure.

## Getting Started

To begin, you'll need to install `imports-loader`:

```console
$ npm install imports-loader --save-dev
```

Given you have this file:

**example.js**

```js
$('img').doSomeAwesomeJqueryPluginStuff();
```

Then you can inject the `jquery` value into the module by configuring the `imports-loader` using two approaches.

### Inline

The `|` or `%20` (space) allow to separate the `syntax`, `moduleName`, `name` and `alias` of import.
The documentation and syntax examples can be read [here](#syntax).

> ⚠ `%20` is space in a query string, because you can't use spaces in URLs

```js
// Alternative syntax:
//
// import myLib from 'imports-loader?imports=default%20jquery%20$!./example.js';
//
// `%20` is space in a query string, equivalently `default jquery $`
import myLib from 'imports-loader?imports=default|jquery|$!./example.js';
// Adds the following code to the beginning of example.js:
//
// import $ from "jquery";
//
// ...
// Code
// ...
```

```js
import myLib from 'imports-loader?imports=default|jquery|$,angular!./example.js';
// `|` is separator in a query string, equivalently `default|jquery|$` and `angular`
// Adds the following code to the beginning of example.js:
//
// import $ from "jquery";
// import angular from "angular";
//
// ...
// Code
// ...
```

```js
import myLib from 'imports-loader?imports=named|library|myMethod,angular!./example.js';
// `|` is separator in a query string, equivalently `named|library|myMethod` and `angular`
// Adds the following code to the beginning of example.js:
//
// import { myMethod } from "library";
// import angular from "angular";
//
// ...
// Code
// ...
```

```js
const myLib = require(`imports-loader?type=commonjs&imports=single|jquery|$,angular!./example.js`);
// `|` is separator in a query string, equivalently `single|jquery|$` and `angular`
// Adds the following code to the beginning of example.js:
//
// var $ = require("jquery");
// var angular = require("angular");
//
// ...
// Code
// ...
```

```js
const myLib = require(`imports-loader?type=commonjs&imports=single|myLib|myMethod&wrapper=window&!./example.js`);
// `|` is separator in a query string, equivalently `single|myLib|myMethod` and `angular`
// Adds the following code to the example.js:
//
// const myMethod = require('myLib');
//
// (function () {
// ...
// Code
// ...
// }.call(window));
```

```js
import myLib from 'imports-loader?additionalCode=var%20myVariable%20=%20false;!./example.js';
// Adds the following code to the beginning of example.js:
//
// var myVariable = false;
//
// ...
// Code
// ...
```

### Using Configuration

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        // You can use `regexp`
        // test: /example\.js/$
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: [
                'default jquery $',
                'default lib_2 lib_2_default',
                'named lib_3 lib2_method_1',
                'named lib_3 lib2_method_2 lib_2_method_2_short',
                'namespace lib_4 my_namespace',
                'side-effects lib_5',
                {
                  syntax: 'default',
                  moduleName: 'angular',
                  name: 'angular',
                },
              ],
            },
          },
        ],
      },
    ],
  },
};
```

Generate output:

```js
import $ from 'jquery';
import lib_2_default from 'lib_2';
import { lib2_method_1, lib2_method_2 as lib_2_method_2_short } from 'lib_3';
import * as my_namespace from 'lib_4';
import 'lib_5';
import angular from 'angular';
```

And run `webpack` via your preferred method.

## Options

|                  Name                   |                   Type                    |   Default   | Description                                                            |
| :-------------------------------------: | :---------------------------------------: | :---------: | :--------------------------------------------------------------------- |
|           **[`type`](#type)**           |                `{String}`                 |  `module`   | Format of generated imports                                            |
|        **[`imports`](#imports)**        | `{String\|Object\|Array<String\|Object>}` | `undefined` | List of imports                                                        |
|        **[`wrapper`](#wrapper)**        |        `{Boolean\|String\|Object}`        | `undefined` | Closes the module code in a function (`(function () { ... }).call();`) |
| **[`additionalCode`](#additionalcode)** |                `{String}`                 | `undefined` | Adds custom code                                                       |

### `type`

Type: `String`
Default: `module`

Format of generated exports.

Possible values - `commonjs` (CommonJS module syntax) and `module` (ES module syntax).

#### `commonjs`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        loader: 'imports-loader',
        options: {
          syntax: 'default',
          type: 'commonjs',
          imports: 'Foo',
        },
      },
    ],
  },
};
```

Generate output:

```js
var Foo = require('Foo');

// ...
// Code
// ...
```

#### `module`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        loader: 'imports-loader',
        options: {
          type: 'module',
          imports: 'Foo',
        },
      },
    ],
  },
};
```

Generate output:

```js
import Foo from 'Foo';

// ...
// Code
// ...
```

### `imports`

Type: `String|Object|Array<String|Object>`
Default: `undefined`

List of imports.

#### `String`

Allows to use a string to describe an export.

##### `Syntax`

The `|` or `%20` (space) allow to separate the `syntax`, `moduleName`, `name` and `alias` of import.

String syntax - `[[syntax] [moduleName] [name] [alias]]` or `[[syntax]|[moduleName]|[name]|[alias]]`, where:

- `[syntax]` (**may be omitted**):

  - if `type` is `module`- can be `default`, `named`, `namespace` or `side-effects`, the default value is `default`.
  - if `type` is `commonjs`- can be `single`, `multiple` or `pure`, the default value is `single`.

- `[moduleName]` - name of an imported module (**required**)
- `[name]` - name of an imported value (**required**)
- `[alias]` - alias of an imported value (**may be omitted**)

Examples:

If type `module`:

- `[Foo]` - generates `import Foo from "Foo";`.
- `[default Foo]` - generates `import Foo from "Foo";`.
- `[default ./my-lib Foo]` - generates `import Foo from "./my-lib";`.
- `[named Foo FooA]` - generates `import { FooA } from "Foo";`.
- `[named Foo FooA Bar]` - generates `import { FooA as Bar } from "Foo";`.
- `[namespace Foo FooA]` - generates `import * as FooA from "Foo";`.
- `[side-effects Foo]` - generates `import "Foo";`.

If type `commonjs`:

- `[Foo]` - generates `const Foo = require("Foo");`.
- `[single Foo]` - generates `const Foo = require("Foo");`.
- `[single ./my-lib Foo]` - generates `const Foo = require("./my-lib");`.
- `[multiple Foo FooA Bar]` - generates `const { FooA: Bar } = require("Foo");`.
- `[pure Foo]` - generates `require("Foo");`.

> ⚠ You need to set `type: "commonjs"` to use `single`, `multiple` and `pure` syntaxes.

> ⚠ Aliases can't be used together with `default`, `namespace`, `side-effects`, `single` and `pure` syntaxes.

###### Examples

###### ES Module Default Import

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/example.js'),
        loader: 'imports-loader',
        options: {
          imports: 'default lib myName',
        },
      },
    ],
  },
};
```

Generate output:

```js
import myName from 'lib';

// ...
// Code
// ...
```

###### CommonJS Single Import

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/example.js'),
        loader: 'imports-loader',
        options: {
          type: 'commonjs',
          imports: 'single lib myName',
        },
      },
    ],
  },
};
```

Generate output:

```js
var myName = require('lib');

// ...
// Code
// ...
```

#### `Object`

Allows to use an object to describe an import.

Properties:

- `syntax`:

  - if `type` is `module`- can be `default`, `named`, `namespace` or `side-effects`
  - if `type` is `commonjs`- can be `single`, `multiple` or `pure`

- `moduleName` - name of an imported module (**required**)
- `name` - name of an imported value (**required**)
- `alias` - alias of an imported value (**may be omitted**)

> ⚠ Alias can't be used together with `default`, `namespace`, `side-effects`, `single` and `pure` syntaxes.

##### Examples

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                syntax: 'named',
                moduleName: 'lib_2',
                name: 'lib2_method_2',
                alias: 'lib_2_method_2_alias',
              },
            },
          },
        ],
      },
    ],
  },
};
```

Generate output:

```js
import { lib2_method_2 as lib_2_method_2_alias } from 'lib_2';

// ...
// Code
// ...
```

#### `Array`

Allow to specify multiple imports.
Each item can be a [`string`](https://github.com/webpack-contrib/imports-loader#string) or an [`object`](https://github.com/webpack-contrib/imports-loader#object).

##### Examples

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: [
                {
                  moduleName: 'angular',
                },
                {
                  syntax: 'default',
                  moduleName: 'jquery',
                  name: '$',
                },
                'default lib_2 lib_2_default',
                'named lib_2 lib2_method_1',
                'named lib_2 lib2_method_2 lib_2_method_2_alias',
                'namespace lib_3 lib_3_all',
                'side-effects lib_4',
              ],
            },
          },
        ],
      },
    ],
  },
};
```

Generate output:

```js
import angular from 'angular';
import $ from 'jquery';
import lib_2_default from 'lib_2';
import { lib2_method_1, lib2_method_2 as lib_2_method_2_alias } from 'lib_2';
import * as lib_3_all from 'lib_3';
import 'lib_4';

// ...
// Code
// ...
```

### `wrapper`

Type: `Boolean|String|Object`
Default: `undefined`

Closes the module code in a function with a given `thisArg` and `args` (`(function () { ... }).call();`).

> ⚠ Do not use this option if source code contains ES module import(s)

#### `Boolean`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              wrapper: true,
            },
          },
        ],
      },
    ],
  },
};
```

Generate output:

```js
import $ from 'jquery';

(function () {
  // ...
  // Code
  // ...
}.call());
```

#### `String`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              wrapper: 'window',
            },
          },
        ],
      },
    ],
  },
};
```

Generate output:

```js
import $ from 'jquery';

(function () {
  // ...
  // Code
  // ...
}.call(window));
```

#### `Object`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              wrapper: {
                thisArg: 'window',
                args: ['myVariable', 'myOtherVariable'],
              },
            },
          },
        ],
      },
    ],
  },
};
```

Generate output:

```js
import $ from 'jquery';

(function (myVariable, myOtherVariable) {
  // ...
  // Code
  // ...
}.call(window, myVariable, myOtherVariable));
```

#### `Object` with different parameter names

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              wrapper: {
                thisArg: 'window',
                args: {
                  myVariable: 'var1',
                  myOtherVariable: 'var2',
                },
              },
            },
          },
        ],
      },
    ],
  },
};
```

Generate output:

```js
import $ from 'jquery';

(function (var1, var2) {
  // ...
  // Code
  // ...
}.call(window, myVariable, myOtherVariable));
```

### `additionalCode`

Type: `String`
Default: `undefined`

Adds custom code as a preamble before the module's code.

##### Examples

###### Define custom variable

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              additionalCode: 'var myVariable = false;',
            },
          },
        ],
      },
    ],
  },
};
```

Generate output:

```js
import $ from 'jquery';

var myVariable = false;

// ...
// Code
// ...
```

###### Disable AMD Import Syntax

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              additionalCode:
                'var define = false; /* Disable AMD for misbehaving libraries */',
            },
          },
        ],
      },
    ],
  },
};
```

Generate output:

```js
import $ from 'jquery';

var define = false; /* Disable AMD for misbehaving libraries */

// ...
// Code
// ...
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/imports-loader.svg
[npm-url]: https://www.npmjs.com/package/imports-loader
[node]: https://img.shields.io/node/v/imports-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/imports-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/imports-loader
[tests]: https://github.com/webpack-contrib/imports-loader/workflows/imports-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/imports-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/imports-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/imports-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=imports-loader
[size-url]: https://packagephobia.now.sh/result?p=imports-loader
