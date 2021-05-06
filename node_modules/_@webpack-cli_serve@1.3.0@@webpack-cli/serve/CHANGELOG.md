# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.3.0](https://github.com/webpack/webpack-cli/compare/@webpack-cli/serve@1.2.2...@webpack-cli/serve@1.3.0) (2021-02-02)

### Bug Fixes

-   avoid deprecation message ([9d6dbda](https://github.com/webpack/webpack-cli/commit/9d6dbda93da167a1aaad03f599105a4fe7849dc3))
-   error message on invalid plugin options ([#2380](https://github.com/webpack/webpack-cli/issues/2380)) ([f9ce1d3](https://github.com/webpack/webpack-cli/commit/f9ce1d30b83bf0e0b4d91498d012c13c208e6e67))

### Features

-   entries syntax ([#2369](https://github.com/webpack/webpack-cli/issues/2369)) ([6b31614](https://github.com/webpack/webpack-cli/commit/6b3161479578f572f803f579c7e71073eb797184))

## [1.2.2](https://github.com/webpack/webpack-cli/compare/@webpack-cli/serve@1.2.1...@webpack-cli/serve@1.2.2) (2021-01-19)

### Bug Fixes

-   pass all `argv` to configurations when `serve` command used ([#2345](https://github.com/webpack/webpack-cli/issues/2345)) ([5070b9b](https://github.com/webpack/webpack-cli/commit/5070b9bcbd5bdac00088d0c21486ad181a4df000))
-   respect `--stats`, `--color` and `--no-color` option for serve c… ([#2312](https://github.com/webpack/webpack-cli/issues/2312)) ([73d3fec](https://github.com/webpack/webpack-cli/commit/73d3feced18b4e3708f958707326a6642a594cf2))

## [1.2.1](https://github.com/webpack/webpack-cli/compare/@webpack-cli/serve@1.2.0...@webpack-cli/serve@1.2.1) (2020-12-31)

### Bug Fixes

-   do not apply HotModuleReplacement plugin twice ([#2269](https://github.com/webpack/webpack-cli/issues/2269)) ([bb16d44](https://github.com/webpack/webpack-cli/commit/bb16d4481414a5f3c0cbeb18af690084b2ae4215))
-   respect the `output.publicPath` option for the `serve`command ([#2271](https://github.com/webpack/webpack-cli/issues/2271)) ([a3092ef](https://github.com/webpack/webpack-cli/commit/a3092ef2b51ece30221f7dd7b30a686626c1fd7a))
-   the `--help` option is working without `webpack-dev-server` ([#2267](https://github.com/webpack/webpack-cli/issues/2267)) ([1dae54d](https://github.com/webpack/webpack-cli/commit/1dae54da94d3220437b9257efe512447023de1d3))
-   the `--progress` option with the `serve` command ([#2265](https://github.com/webpack/webpack-cli/issues/2265)) ([952a188](https://github.com/webpack/webpack-cli/commit/952a1883b1a18c4fb38e8eb7bbbdb2aefc7942f4))

# [1.2.0](https://github.com/webpack/webpack-cli/compare/@webpack-cli/serve@1.1.0...@webpack-cli/serve@1.2.0) (2020-12-25)

### Bug Fixes

-   respect `--watch-options-stdin` ([2d1e001](https://github.com/webpack/webpack-cli/commit/2d1e001e7f4f560c2b36607bd1b29dfe2aa32066))
-   do not default host in webpack-dev-server v4 ([#2141](https://github.com/webpack/webpack-cli/issues/2141)) ([dbbe4d4](https://github.com/webpack/webpack-cli/commit/dbbe4d4bc93ff9147ba43fae2d2352fa3583558d))
-   do not default port in webpack-dev-server v4 ([#2126](https://github.com/webpack/webpack-cli/issues/2126)) ([cda3047](https://github.com/webpack/webpack-cli/commit/cda30471f51db4631a0f54b852c553de270f7f64))
-   set client port when using default port ([#2147](https://github.com/webpack/webpack-cli/issues/2147)) ([4b97348](https://github.com/webpack/webpack-cli/commit/4b973488a42c4e12d86e0324a4c7051d1380a6fa))
-   catch dev server import during webpack serve ([#2070](https://github.com/webpack/webpack-cli/issues/2070)) ([70bf770](https://github.com/webpack/webpack-cli/commit/70bf7708c21dffe6521f1800b9dec2a62d21cfe2))
-   respect `--color`/`--no-color` options ([#2042](https://github.com/webpack/webpack-cli/issues/2042)) ([09bd812](https://github.com/webpack/webpack-cli/commit/09bd8126e95c9675b1f6862451f629cd4c439adb))

# [1.1.0](https://github.com/webpack/webpack-cli/compare/@webpack-cli/serve@1.0.1...@webpack-cli/serve@1.1.0) (2020-11-04)

### Bug Fixes

-   resolve dev server hot options correctly ([#2022](https://github.com/webpack/webpack-cli/issues/2022)) ([7c5a2ba](https://github.com/webpack/webpack-cli/commit/7c5a2bae49625ee4982d7478b7e741968731cea2))

### Features

-   add WEBPACK_SERVE environment variable ([#2027](https://github.com/webpack/webpack-cli/issues/2027)) ([ea369a9](https://github.com/webpack/webpack-cli/commit/ea369a98ea5ec366b688caebcb1276d9fbe0c651))
-   export utils from core for other packages ([#2011](https://github.com/webpack/webpack-cli/issues/2011)) ([3004549](https://github.com/webpack/webpack-cli/commit/3004549c06b3fe00708d8e1eecf42419e0f72f66))

## [1.0.1](https://github.com/webpack/webpack-cli/compare/@webpack-cli/serve@1.0.1-rc.1...@webpack-cli/serve@1.0.1) (2020-10-10)

**Note:** Version bump only for package @webpack-cli/serve

## [1.0.1-rc.1](https://github.com/webpack/webpack-cli/compare/@webpack-cli/serve@1.0.1-alpha.5...@webpack-cli/serve@1.0.1-rc.1) (2020-10-06)

### Bug Fixes

-   peer dependencies for `webpack serve` ([#1317](https://github.com/webpack/webpack-cli/issues/1317)) ([f8ec203](https://github.com/webpack/webpack-cli/commit/f8ec20382702450134032a65403894573b04be8d))
-   **packages:** make packages have correct main paths to index ([#1366](https://github.com/webpack/webpack-cli/issues/1366)) ([5dd7bd6](https://github.com/webpack/webpack-cli/commit/5dd7bd62046568481996e48328b15a335557f8ae))
-   **serve:** merge CLI and devServer options correctly ([#1649](https://github.com/webpack/webpack-cli/issues/1649)) ([2cdf5ce](https://github.com/webpack/webpack-cli/commit/2cdf5ce159f63ac65b33f4aca4c82fa1e959fef5))
-   **serve:** supplying help or version as an arg should throw error ([#1694](https://github.com/webpack/webpack-cli/issues/1694)) ([6eb7883](https://github.com/webpack/webpack-cli/commit/6eb78833f910135ca798c0c28f8d236ef234a76c))

### Features

-   allow multiple targets ([#1799](https://github.com/webpack/webpack-cli/issues/1799)) ([1724ddb](https://github.com/webpack/webpack-cli/commit/1724ddb9067d5c5ba2654d4e5473ee9de5610825))
-   serve integration ([#1712](https://github.com/webpack/webpack-cli/issues/1712)) ([d3e2936](https://github.com/webpack/webpack-cli/commit/d3e29368c40ee47e4f7a07c41281714645e20ea7))

## [1.0.1-alpha.5](https://github.com/ematipico/webpack-cli/compare/@webpack-cli/serve@1.0.1-alpha.4...@webpack-cli/serve@1.0.1-alpha.5) (2020-03-02)

**Note:** Version bump only for package @webpack-cli/serve

## [1.0.1-alpha.4](https://github.com/ematipico/webpack-cli/compare/@webpack-cli/serve@1.0.1-alpha.3...@webpack-cli/serve@1.0.1-alpha.4) (2020-02-29)

**Note:** Version bump only for package @webpack-cli/serve

## [1.0.1-alpha.3](https://github.com/ematipico/webpack-cli/compare/@webpack-cli/serve@1.0.1-alpha.2...@webpack-cli/serve@1.0.1-alpha.3) (2020-02-23)

**Note:** Version bump only for package @webpack-cli/serve

## [1.0.1-alpha.2](https://github.com/webpack/webpack-cli/compare/@webpack-cli/serve@1.0.1-alpha.1...@webpack-cli/serve@1.0.1-alpha.2) (2020-02-23)

**Note:** Version bump only for package @webpack-cli/serve

## [1.0.1-alpha.1](https://github.com/webpack/webpack-cli/compare/@webpack-cli/serve@1.0.1-alpha.0...@webpack-cli/serve@1.0.1-alpha.1) (2020-02-23)

### Bug Fixes

-   **init:** fix webpack config scaffold ([#1231](https://github.com/webpack/webpack-cli/issues/1231)) ([2dc495a](https://github.com/webpack/webpack-cli/commit/2dc495a8d050d28478c6c2533d7839e9ff78d76c)), closes [#1230](https://github.com/webpack/webpack-cli/issues/1230)
