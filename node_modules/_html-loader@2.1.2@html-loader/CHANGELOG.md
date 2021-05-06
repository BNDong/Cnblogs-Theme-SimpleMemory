# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.1.2](https://github.com/webpack-contrib/html-loader/compare/v2.1.1...v2.1.2) (2021-03-09)


### Bug Fixes

* avoid using `file` protocol ([a309fe0](https://github.com/webpack-contrib/html-loader/commit/a309fe0654972b28d5f9639a97ad993342fb3e85))

### [2.1.1](https://github.com/webpack-contrib/html-loader/compare/v2.1.0...v2.1.1) (2021-02-24)


### Bug Fixes

* handle the `content` attribute ([#372](https://github.com/webpack-contrib/html-loader/issues/372)) ([002e2a1](https://github.com/webpack-contrib/html-loader/commit/002e2a144c26601136cca1073cd84f1a18e67033))
* invalid URL for runtime helpers ([#373](https://github.com/webpack-contrib/html-loader/issues/373)) ([b19cfd0](https://github.com/webpack-contrib/html-loader/commit/b19cfd0e9344f15edf69df58afd8def96436b11d))

## [2.1.0](https://github.com/webpack-contrib/html-loader/compare/v2.0.0...v2.1.0) (2021-02-20)


### Features

* added support webpackIgnore comment ([#366](https://github.com/webpack-contrib/html-loader/issues/366)) ([ab57a28](https://github.com/webpack-contrib/html-loader/commit/ab57a28b6e27acfc75ad3f398ef916c780872ca0))

## [2.0.0](https://github.com/webpack-contrib/html-loader/compare/v1.3.2...v2.0.0) (2021-02-14)


### ⚠ BREAKING CHANGES

* `new URL('./source.ext', import.meta.url)` syntax is using for importing `sources` (i.e. `src`/`srcset`/etc) and the `esModule` option is `true` by default, you can disable it by setting the `esModule` option to `false`
* rename the `attributes` option to `sources`
* the `attributes.root` option was removed in favor [`resolve.roots`](https://webpack.js.org/configuration/resolve/#resolveroots)
* minimum supported `webpack` version is `5`
* migrate from `htmlparser2` to `parse5`

### Features

* handle more attribute for `meta` and `link` tags ([348e4f5](https://github.com/webpack-contrib/html-loader/commit/348e4f5693d77cd5900e824ec13d730dc16c7e8f))
* allow to disable default sources ([#351](https://github.com/webpack-contrib/html-loader/issues/351)) ([480656f](https://github.com/webpack-contrib/html-loader/commit/480656f5bdd448cfa043391a0aab67b1cbd84f18))

### Bug Fixes

* broken `src` with `#hash` ([#342](https://github.com/webpack-contrib/html-loader/issues/342)) ([d6590b0](https://github.com/webpack-contrib/html-loader/commit/d6590b081cb19ffb1fd397675977dda0b9dd04b9))
* handle `\` character ([#353](https://github.com/webpack-contrib/html-loader/issues/353)) ([c124fae](https://github.com/webpack-contrib/html-loader/commit/c124faee3b20362b78fed26700c271a4bbe54852))
* pass hash from request to other loaders ([#349](https://github.com/webpack-contrib/html-loader/issues/349)) ([e97d3c8](https://github.com/webpack-contrib/html-loader/commit/e97d3c858c70b9e13d4818b5f2ef2ac2d15df778))

### [1.3.2](https://github.com/webpack-contrib/html-loader/compare/v1.3.1...v1.3.2) (2020-10-09)

### Chore

* update `schema-utils`

### [1.3.1](https://github.com/webpack-contrib/html-loader/compare/v1.3.0...v1.3.1) (2020-09-21)


### Bug Fixes

* avoid removing redundant attributes ([#324](https://github.com/webpack-contrib/html-loader/issues/324)) ([ab299ac](https://github.com/webpack-contrib/html-loader/commit/ab299acd8784f96f9191988133fb74f72aaf89c8))

## [1.3.0](https://github.com/webpack-contrib/html-loader/compare/v1.2.1...v1.3.0) (2020-08-25)


### Features

* `...` syntax to extend default tag and attributes ([#317](https://github.com/webpack-contrib/html-loader/issues/317)) ([f02bb48](https://github.com/webpack-contrib/html-loader/commit/f02bb48a1124fc567b858234b1cf3d3e68bb6c76))


### Bug Fixes

* handle `script` tags in SVG ([#315](https://github.com/webpack-contrib/html-loader/issues/315)) ([d021e42](https://github.com/webpack-contrib/html-loader/commit/d021e42fc830d36cf2ab3e9d483fd5723af23ba8))

### [1.2.1](https://github.com/webpack-contrib/html-loader/compare/v1.2.0...v1.2.1) (2020-08-19)


### Bug Fixes

* ignore template sources ([#314](https://github.com/webpack-contrib/html-loader/issues/314)) ([078d9bd](https://github.com/webpack-contrib/html-loader/commit/078d9bdc36d256d6a78ab0ae9b8ccddbef11393c))

## [1.2.0](https://github.com/webpack-contrib/html-loader/compare/v1.1.0...v1.2.0) (2020-08-18)


### Features

* support SVG tags ([#302](https://github.com/webpack-contrib/html-loader/issues/302)) ([1acd204](https://github.com/webpack-contrib/html-loader/commit/1acd20448dbe976b883597b135bb8ac9e1b71d1a))


### Bug Fixes

* do not handle non standard `script` types ([ddad9f2](https://github.com/webpack-contrib/html-loader/commit/ddad9f2d6f5ab75fe2afd247bf55b1646c6e1c31))
* inline syntax for sources ([#310](https://github.com/webpack-contrib/html-loader/issues/310)) ([c247cfa](https://github.com/webpack-contrib/html-loader/commit/c247cfa9ad66281b28aef5397c8c2d2786f05867))
* linefeed characters in sources ([#311](https://github.com/webpack-contrib/html-loader/issues/311)) ([b8ee9ee](https://github.com/webpack-contrib/html-loader/commit/b8ee9ee0d60848e84e52fb117c1f3cdc2ebf08d7))
* minimize is more safely ([#304](https://github.com/webpack-contrib/html-loader/issues/304)) ([03152b1](https://github.com/webpack-contrib/html-loader/commit/03152b1d3b807a287d84302f6a9987ceb22d395c))
* perf ([#300](https://github.com/webpack-contrib/html-loader/issues/300)) ([d69f259](https://github.com/webpack-contrib/html-loader/commit/d69f259d2a6b4bc9ba9c163fd2d70989c3f3a6ff))

## [1.1.0](https://github.com/webpack-contrib/html-loader/compare/v1.0.0...v1.1.0) (2020-04-02)


### Features

* added support for an async functions to the `preprocessor` option ([#272](https://github.com/webpack-contrib/html-loader/issues/272)) ([e59324b](https://github.com/webpack-contrib/html-loader/commit/e59324b929557a9e1da5e1713748351cf37efdb1))
* allowed to handle an attribute without a tag ([#273](https://github.com/webpack-contrib/html-loader/issues/273)) ([c0d6d5b](https://github.com/webpack-contrib/html-loader/commit/c0d6d5b9338af219a5cd81779ee2bcd9254420ed))


### Bug Fixes

* hash processing improved ([#275](https://github.com/webpack-contrib/html-loader/issues/275)) ([74d2c60](https://github.com/webpack-contrib/html-loader/commit/74d2c607c519bdaad995a51e74b6317c8cfaad14))

## [1.0.0](https://github.com/ryanclark/html-loader/compare/v0.5.5...v1.0.0) (2020-03-19)


### ⚠ BREAKING CHANGES

* for parsing HTML now we use `htmlparser2` package
* the `attrs` option was renamed to the `attributes` option
* the `interpolate` option was removed, please consider migration on the [`preprocessor`](https://github.com/webpack-contrib/html-loader#preprocessor)
* the `minimize` option is `true` by default in `production` mode. You need to list all options for `html-minifier` if you use `object` notation.
* uppercase tags and uppercase attributes are handled by default
* the `root` option was moved under the `attributes` option, please look at the [documentation](https://github.com/webpack-contrib/html-loader#object)
* emit an error on broken HTML syntax when minimization is enabled
* By default, now we process the following tags with attributes:
  * the `src` attribute of the `audio` tag
  * the `src` attribute of the `embed` tag
  * the `src` attribute of the `img` tag
  * the `srcset` attribute of the `img` tag
  * the `src` attribute of the `input` tag
  * the `href` attribute of the `link` tag (only for stylesheets)
  * the `data` attribute of the `object` tag
  * the `src` attribute of the `script` tag
  * the `src` attribute of the `source` tag
  * the `srcset` attribute of the `source` tag
  * the `src` attribute of the `track` tag
  * the `poster` attribute of the `video` tag
  * the `src` attribute of the `video` tag
* the `attributes` option should be `Boolean` or `Object`, please look at the [documentation](https://github.com/webpack-contrib/html-loader#object)
* the `exportAsDefault` option were removed in favor the `esModules` option
* the `exportAsEs6Default` option were removed in favor the `esModules` option

### Features

* handle more tags and attributes
* added the `preprocessor` option
* added the `esModule` option
* add the `rulFilter` option for filtering some of urls, please look at the [documentation](https://github.com/webpack-contrib/html-loader#urlfilter)
* allow to setup how to handle and filter tags and attributes, please look at the [documentation](https://github.com/webpack-contrib/html-loader#list)
* improve error reporting

### Bug Fixes

* adding quotes when necessary for unquoted sources
* do not handle empty attributes
* escape `\u2028` and `\u2029` characters
* handle only valid srcset tags
* parser tags and attributes according spec
* reduce `import`/`require` count
* reduce size of generated modules
* respect `#hash` in sources
* support ES6 syntax in `script` tags when minimize
* support ES6 import of urls

<a name="0.5.5"></a>
## [0.5.5](https://github.com/webpack-contrib/html-loader/compare/v0.5.4...v0.5.5) (2018-01-17)


### Bug Fixes

* **index:** don't prepend `./` to the URL on `interpolate=require` (`options.interpolate`) ([#165](https://github.com/webpack-contrib/html-loader/issues/165)) ([9515410](https://github.com/webpack-contrib/html-loader/commit/9515410))



<a name="0.5.4"></a>
## [0.5.4](https://github.com/webpack-contrib/html-loader/compare/v0.5.1...v0.5.4) (2018-01-05)


### Bug Fixes

* ignore attribute if `mailto:` is present ([#145](https://github.com/webpack-contrib/html-loader/issues/145)) ([4b13d4c](https://github.com/webpack-contrib/html-loader/commit/4b13d4c))
* **index:** escape double quotes correctly (`options.interpolate`) ([#154](https://github.com/webpack-contrib/html-loader/issues/154)) ([1ef5de4](https://github.com/webpack-contrib/html-loader/commit/1ef5de4))


<a name="0.5.1"></a>
## [0.5.1](https://github.com/webpack/html-loader/compare/v0.5.0...v0.5.1) (2017-08-08)


### Bug Fixes

* Support for empty tags in tag-attribute matching ([#133](https://github.com/webpack/html-loader/issues/133)) ([6efa6de](https://github.com/webpack/html-loader/commit/6efa6de)), closes [#129](https://github.com/webpack/html-loader/issues/129)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/webpack/html-loader/compare/v0.4.3...v0.5.0) (2017-07-26)


### Features

* add support for empty tags in `tag:attribute` matching ([#129](https://github.com/webpack/html-loader/issues/129)) ([70370dc](https://github.com/webpack/html-loader/commit/70370dc))


<a name="0.4.5"></a>
## [0.4.5](https://github.com/webpack/html-loader/compare/v0.4.3...v0.4.5) (2017-07-26)


### Bug Fixes

* es6 default export ([fae0309](https://github.com/webpack/html-loader/commit/fae0309))
* Handle es6 default export ([e04e969](https://github.com/webpack/html-loader/commit/e04e969))
* **getOptions:** deprecation warn in loaderUtils ([#114](https://github.com/webpack/html-loader/issues/114)) ([3d47e98](https://github.com/webpack/html-loader/commit/3d47e98))


### Features

* Adds exportAsDefault ([37d40d8](https://github.com/webpack/html-loader/commit/37d40d8))
