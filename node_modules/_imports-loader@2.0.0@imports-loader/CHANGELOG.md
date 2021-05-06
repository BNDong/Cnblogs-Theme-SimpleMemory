# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/webpack-contrib/imports-loader/compare/v1.2.0...v2.0.0) (2021-02-01)

### ⚠ BREAKING CHANGES

* minimum supported `webpack` version is `5`
* inline syntax was changed: `[]` is no longer supported (i.e. `imports-loader?imports[]=default|jquery|$&imports[]=angular!./example.js`), please use `,` comma separator (i.e. `imports-loader?imports=default|jquery|$,angular!./example.js`)

## [1.2.0](https://github.com/webpack-contrib/imports-loader/compare/v1.1.0...v1.2.0) (2020-10-07)


### Features

* add custom parameter names for wrapper args ([#86](https://github.com/webpack-contrib/imports-loader/issues/86)) ([4314ecd](https://github.com/webpack-contrib/imports-loader/commit/4314ecd2b853dec1a4f5a3fa76f8559167732cb5))

## [1.1.0](https://github.com/webpack-contrib/imports-loader/compare/v1.0.0...v1.1.0) (2020-06-24)


### Features

* "|" character can be used as delimiter for inline string syntax ([00697de](https://github.com/webpack-contrib/imports-loader/commit/00697dee3d0108bf632b3f82bd3adc62bd7aa907))

## [1.0.0](https://github.com/webpack-contrib/imports-loader/compare/v0.8.0...v1.0.0) (2020-06-17)


### ⚠ BREAKING CHANGES

* minimum supported Node.js version is `10.13`
* minimum supported `webpack` version is `4`
* `inline` syntax was changed, please [read](https://github.com/webpack-contrib/imports-loader#inline)
* list of imported modules moved to the `imports` option, please [read](https://github.com/webpack-contrib/imports-loader#imports)
* wrapper moved to the `wrapper` option, please [read](https://github.com/webpack-contrib/imports-loader#wrapper)
* custom variables moved to the `additionalCode` option, please [read](https://github.com/webpack-contrib/imports-loader#additionalcode)
* generates ES module default import by default (`import Foo from 'foo';`)

### Features

* validate options
* support webpack 5
* implemented the `type` option (imports can be CommonsJS or ES module format)
* implemented the ability to generate multiple import in CommonJS or ES module format
* improved support of `inline` usage
* allowed to adding arguments for wrapper
* allowed to inject any custom code

### Bug Fixes

* do not crash on invalid inline syntax
* respect `'use strict';`


<a name="0.8.0"></a>
# [0.8.0](https://github.com/webpack-contrib/imports-loader/compare/v0.7.1...v0.8.0) (2018-02-20)


### Features

* allow loading nested objects onto existing libraries ([#45](https://github.com/webpack-contrib/imports-loader/issues/45)) ([44d6f48](https://github.com/webpack-contrib/imports-loader/commit/44d6f48))
