<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# exports-loader

Allow to setup exports `module.exports`/`export` for source files.

Useful when a source file does not contain exports or something does not export.

For further hints on compatibility issues, check out [Shimming](https://webpack.js.org/guides/shimming/) of the official docs.

> ⚠ By default loader generate ES module named syntax.
>
> ⚠ Be careful, existing exports (`export`/`module.exports`/`exports`) in the original code and exporting new values can cause a failure.

## Getting Started

To begin, you'll need to install `exports-loader`:

```console
$ npm install exports-loader --save-dev
```

### Inline

The `|` or `%20` (space) allow to separate the `syntax`, `name` and `alias` of export.
The documentation and syntax examples can be read [here](#syntax).

> ⚠ `%20` is space in a query string, because you can't use spaces in URLs

Then add the loader to the desired `import` statement or `require` calls. For example:

```js
import { myFunction } from 'exports-loader?exports=myFunction!./file.js';
// Adds the following code to the file's source:
//
// ...
// Code
// ...
//
// export { myFunction }

myFunction('Hello world');
```

```js
import {
  myVariable,
  myFunction,
} from 'exports-loader?exports=myVariable,myFunction!./file.js';
// Adds the following code to the file's source:
//
// ...
// Code
// ...
//
// export { myVariable, myFunction };

const newVariable = myVariable + '!!!';

console.log(newVariable);

myFunction('Hello world');
```

```js
const {
  myFunction,
} = require('exports-loader?type=commonjs&exports=myFunction!./file.js');
// Adds the following code to the file's source:
//
// ...
// Code
// ...
//
// module.exports = { myFunction }

myFunction('Hello world');
```

```js
// Alternative syntax:
// import myFunction from 'exports-loader?exports=default%20myFunction!./file.js';
import myFunction from 'exports-loader?exports=default|myFunction!./file.js';
// `%20` is space in a query string, equivalently `default myFunction`
// Adds the following code to the file's source:
//
// ...
// Code
// ...
//
// exports default myFunction;

myFunction('Hello world');
```

```js
const myFunction = require('exports-loader?type=commonjs&exports=single|myFunction!./file.js');
// `|` is separator in a query string, equivalently `single|myFunction`
// Adds the following code to the file's source:
//
// ...
// Code
// ...
//
// module.exports = myFunction;

myFunction('Hello world');
```

```js
import { myFunctionAlias } from 'exports-loader?exports=named|myFunction|myFunctionAlias!./file.js';
// `|` is separator in a query string, equivalently `named|myFunction|myFunctionAlias`
// Adds the following code to the file's source:
//
// ...
// Code
// ...
//
// exports { myFunction as myFunctionAlias };

myFunctionAlias('Hello world');
```

Description of string values can be found in the documentation below.

### Using Configuration

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        // You can use `regexp`
        // test: /vendor\.js/$
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: 'myFunction',
        },
      },
    ],
  },
};
```

And run `webpack` via your preferred method.

## Options

|           Name            |                   Type                    |   Default   | Description                 |
| :-----------------------: | :---------------------------------------: | :---------: | :-------------------------- |
|    **[`type`](#type)**    |                `{String}`                 |  `module`   | Format of generated exports |
| **[`exports`](#exports)** | `{String\|Object\|Array<String\|Object>}` | `undefined` | List of exports             |

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
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: 'Foo',
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

module.exports = { Foo };
```

#### `module`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'module',
          exports: 'Foo',
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

export { Foo };
```

### `exports`

Type: `String|Array`
Default: `undefined`

List of exports.

#### `String`

Allows to use a string to describe an export.

##### `Syntax`

The `|` or `%20` (space) allow to separate the `syntax`, `name` and `alias` of export.

String syntax - `[[syntax] [name] [alias]]` or `[[syntax]|[name]|[alias]]`, where:

- `[syntax]` (**may be omitted**) -

  - if `type` is `module`- can be `default` and `named`,
  - if `type` is `commonjs`- can be `single` and `multiple`

- `[name]` - name of an exported value (**required**)
- `[alias]` - alias of an exported value (**may be omitted**)

Examples:

- `[Foo]` - generates `export { Foo };`.
- `[default Foo]` - generates `export default Foo;`.
- `[named Foo]` - generates `export { Foo };`.
- `[named Foo FooA]` - generates `export { Foo as FooA };`.
- `[single Foo]` - generates `module.exports = Foo;`.
- `[multiple Foo]` - generates `module.exports = { Foo };`.
- `[multiple Foo FooA]` - generates `module.exports = { 'FooA': Foo };`.
- `[named [name] [name]Alias]` - generates ES module named exports and exports a value equal to the filename under other name., for `single.js` it will be `single` and `singleAlias`, generates `export { single as singleAlias };`.

> ⚠ You need to set `type: "commonjs"` to use `single` or `multiple` syntaxes.

> ⚠ Aliases can't be used together with `default` or `single` syntaxes.

##### Examples

###### ES Module Default Export

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: 'default Foo',
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

export default Foo;
```

###### ES Module Named Exports

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: 'named Foo FooA',
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

export { Foo as FooA };
```

###### CommonJS Single Export

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: 'single Foo',
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

module.exports = Foo;
```

###### CommonJS Multiple Exports

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: 'multiple Foo FooA',
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

module.exports = { FooA: Foo };
```

#### `Object`

Allows to use an object to describe an export.

Properties:

- `syntax` - can be `default` or `named` for the `module` type (`ES modules` module format), and `single` or `multiple` for the `commonjs` type (`CommonJS` module format) (**may be omitted**)
- `name` - name of an exported value (**required**)
- `alias` - alias of an exported value (**may be omitted**)

##### Examples

###### ES Module Default Export

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: {
            syntax: 'default',
            name: 'Foo',
          },
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

export default Foo;
```

###### ES Module Named Exports

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: {
            syntax: 'named',
            name: 'Foo',
            alias: 'FooA',
          },
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

export { Foo as FooA };
```

###### CommonJS Single Export

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: {
            syntax: 'single',
            name: 'Foo',
          },
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

module.exports = Foo;
```

###### CommonJS Multiple Exports

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: {
            syntax: 'multiple',
            name: 'Foo',
            alias: 'FooA',
          },
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

module.exports = { FooA: Foo };
```

#### `Array`

Allow to specify multiple exports. Each item can be a [`string`](https://github.com/webpack-contrib/exports-loader#string) or an [`object`](https://github.com/webpack-contrib/exports-loader#object).

> ⚠ Not possible to use `single` and `multiple` syntaxes together due to CommonJS format limitations.

> ⚠ Not possible to use multiple `default` values due to ES module format limitations.

> ⚠ Not possible to use multiple `single` values due to CommonJS format limitations.

##### Examples

###### CommonJS Multiple Exports

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: ['Foo', 'multiple Bar', 'multiple Baz BazA'],
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

module.exports = { Foo, Bar, BazA: Bar };
```

###### ES Module Default Export And Named Exports Together

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: ['default Foo', 'named Bar BarA'],
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

export default Foo;
export { Bar as BarA };
```

###### Named Exports

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: [
            { syntax: 'named', name: 'Foo', alias: 'FooA' },
            { syntax: 'named', name: 'Bar' },
            'Baz',
          ],
        },
      },
    ],
  },
};
```

Generate output:

```js
// ...
// Code
// ...

export { Foo as FooA, Bar, Baz };
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/exports-loader.svg
[npm-url]: https://npmjs.com/package/exports-loader
[node]: https://img.shields.io/node/v/exports-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/exports-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/exports-loader
[tests]: https://github.com/webpack-contrib/exports-loader/workflows/exports-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/exports-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/exports-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/exports-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=exports-loader
[size-url]: https://packagephobia.now.sh/result?p=exports-loader
