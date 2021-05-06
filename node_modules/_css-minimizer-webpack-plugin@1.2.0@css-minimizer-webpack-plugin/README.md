<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# css-minimizer-webpack-plugin

This plugin uses [cssnano](https://cssnano.co) to optimize and minify your CSS.

Just like [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) but more accurate with source maps and assets using query string, allows to cache and works in parallel mode.

## Getting Started

To begin, you'll need to install `css-minimizer-webpack-plugin`:

```console
$ npm install css-minimizer-webpack-plugin --save-dev
```

Then add the plugin to your `webpack` configuration. For example:

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
```

This will enable CSS optimization only in production mode.
If you want to run it also in development set the `optimization.minimize` option to `true`.

And run `webpack` via your preferred method.

## Options

### `test`

Type: `String|RegExp|Array<String|RegExp>` - default: `/\.css(\?.*)?$/i`

Test to match files against.

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.foo\.css$/i,
      }),
    ],
  },
};
```

### `include`

Type: `String|RegExp|Array<String|RegExp>`
Default: `undefined`

Files to include.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        include: /\/includes/,
      }),
    ],
  },
};
```

### `exclude`

Type: `String|RegExp|Array<String|RegExp>`
Default: `undefined`

Files to exclude.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        exclude: /\/excludes/,
      }),
    ],
  },
};
```

### `cache`

> ⚠ Ignored in webpack 5! Please use https://webpack.js.org/configuration/other-options/#cache.

Type: `Boolean|String`
Default: `true`

Enable file caching.
Default path to cache directory: `node_modules/.cache/css-minimizer-webpack-plugin`.

> ℹ️ If you use your own `minify` function please read the `minify` section for cache invalidation correctly.

#### `Boolean`

Enable/disable file caching.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        cache: true,
      }),
    ],
  },
};
```

#### `String`

Enable file caching and set path to cache directory.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        cache: 'path/to/cache',
      }),
    ],
  },
};
```

### `cacheKeys`

> ⚠ Ignored in webpack 5! Please use https://webpack.js.org/configuration/other-options/#cache.

Type: `Function<(defaultCacheKeys, file) -> Object>`
Default: `defaultCacheKeys => defaultCacheKeys`

Allows you to override default cache keys.

Default cache keys:

```js
({
  cssMinimizer: require('cssnano/package.json').version, // cssnano version
  'css-minimizer-webpack-plugin': require('../package.json').version, // plugin version
  'css-minimizer-webpack-plugin-options': this.options, // plugin options
  path: compiler.outputPath ? `${compiler.outputPath}/${file}` : file, // asset path
  hash: crypto.createHash('md4').update(input).digest('hex'), // source file hash
});
```

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        cache: true,
        cacheKeys: (defaultCacheKeys, file) => {
          defaultCacheKeys.myCacheKey = 'myCacheKeyValue';

          return defaultCacheKeys;
        },
      }),
    ],
  },
};
```

### `parallel`

Type: `Boolean|Number`
Default: `true`

Use multi-process parallel running to improve the build speed.
Default number of concurrent runs: `os.cpus().length - 1`.

> ℹ️ Parallelization can speedup your build significantly and is therefore **highly recommended**.

#### `Boolean`

Enable/disable multi-process parallel running.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
};
```

#### `Number`

Enable multi-process parallel running and set number of concurrent runs.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
  },
};
```

### `sourceMap`

Type: `Boolean|Object`
Default: `false` (see below for details around `devtool` value and `SourceMapDevToolPlugin` plugin)

Enable (and configure) source map support. Use [PostCss SourceMap options](https://github.com/postcss/postcss-loader#sourcemap).
Default configuration when enabled: `{ inline: false }`.

**Works only with `source-map`, `inline-source-map`, `hidden-source-map` and `nosources-source-map` values for the [`devtool`](https://webpack.js.org/configuration/devtool/) option.**

Why? Because CSS support only these source map types.

The plugin respect the [`devtool`](https://webpack.js.org/configuration/devtool/) and using the `SourceMapDevToolPlugin` plugin.
Using supported `devtool` values enable source map generation.
Using `SourceMapDevToolPlugin` with enabled the `columns` option enables source map generation.

Use source maps to map error message locations to modules (this slows down the compilation).
If you use your own `minify` function please read the `minify` section for handling source maps correctly.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true,
      }),
    ],
  },
};
```

### `minify`

Type: `Function`
Default: `undefined`

Allows you to override default minify function.
By default plugin uses [cssnano](https://github.com/cssnano/cssnano) package.
Useful for using and testing unpublished versions or forks.

> ⚠️ **Always use `require` inside `minify` function when `parallel` option enabled**.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true,
        minify: (data, inputMap, minimizerOptions) => {
          const postcss = require('postcss');

          const plugin = postcss.plugin(
            'custom-plugin',
            () => (css, result) => {
              // custom code
            }
          );

          const [[filename, input]] = Object.entries(data);

          const postcssOptions = {
            from: filename,
            to: filename,
            map: {
              prev: inputMap,
            },
          };

          return postcss([plugin])
            .process(input, postcssOptions)
            .then((result) => {
              return {
                css: result.css,
                map: result.map,
                warnings: result.warnings(),
              };
            });
        },
      }),
    ],
  },
};
```

### `minimizerOptions`

Type: `Object`
Default: `{ preset: 'default' }`

Cssnano optimisations [options](https://cssnano.co/docs/optimisations).

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
};
```

### `warningsFilter`

Type: `Function<(warning, file, source) -> Boolean>`
Default: `() => true`

Allow to filter css-minimizer warnings (By default [cssnano](https://github.com/cssnano/cssnano)).
Return `true` to keep the warning, a falsy value (`false`/`null`/`undefined`) otherwise.

> ⚠️ The `source` argument will contain `undefined` if you don't use source maps.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        warningsFilter: (warning, file, source) => {
          if (/Dropping unreachable code/i.test(warning)) {
            return true;
          }

          if (/file\.css/i.test(file)) {
            return true;
          }

          if (/source\.css/i.test(source)) {
            return true;
          }

          return false;
        },
      }),
    ],
  },
};
```

## Examples

### Use sourcemaps

Don't forget to enable `sourceMap` options for all loaders.

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true,
      }),
    ],
  },
};
```

### Remove all comments

Remove all comments (including comments starting with `/*!`).

```js
module.exports = {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
};
```

### Using custom minifier [csso](https://github.com/css/csso)

By default plugin uses [cssnano](https://github.com/cssnano/cssnano) package.
It is possible to use another minify function.

> ⚠️ **Always use `require` inside `minify` function when `parallel` option enabled**.

**webpack.config.js**

```js
module.exports = {
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true,
        minify: async (data, inputMap) => {
          const csso = require('csso');
          const sourcemap = require('source-map');

          const [[filename, input]] = Object.entries(data);
          const minifiedCss = csso.minify(input, {
            filename: filename,
            sourceMap: true,
          });

          if (inputMap) {
            minifiedCss.map.applySourceMap(
              new sourcemap.SourceMapConsumer(inputMap),
              filename
            );
          }

          return {
            css: minifiedCss.css,
            map: minifiedCss.map.toJSON(),
          };
        },
      }),
    ],
  },
};
```

### Using custom minifier [clean-css](https://github.com/jakubpawlowicz/clean-css)

By default plugin uses [cssnano](https://github.com/cssnano/cssnano) package.
It is possible to use another minify function.

> ⚠️ **Always use `require` inside `minify` function when `parallel` option enabled**.

**webpack.config.js**

```js
module.exports = {
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true,
        minify: async (data, inputMap) => {
          // eslint-disable-next-line global-require
          const CleanCSS = require('clean-css');

          const [[filename, input]] = Object.entries(data);
          const minifiedCss = await new CleanCSS({ sourceMap: true }).minify({
            [filename]: {
              styles: input,
              sourceMap: inputMap,
            },
          });

          return {
            css: minifiedCss.styles,
            map: minifiedCss.sourceMap.toJSON(),
            warnings: minifiedCss.warnings,
          };
        },
      }),
    ],
  },
};
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/css-minimizer-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/css-minimizer-webpack-plugin
[node]: https://img.shields.io/node/v/css-minimizer-webpack-plugin.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/css-minimizer-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/css-minimizer-webpack-plugin
[tests]: https://github.com/webpack-contrib/css-minimizer-webpack-plugin/workflows/css-minimizer-webpack-plugin/badge.svg
[tests-url]: https://github.com/webpack-contrib/css-minimizer-webpack-plugin/actions
[cover]: https://codecov.io/gh/webpack-contrib/css-minimizer-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/css-minimizer-webpack-plugin
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=css-minimizer-webpack-plugin
[size-url]: https://packagephobia.now.sh/result?p=css-minimizer-webpack-plugin
