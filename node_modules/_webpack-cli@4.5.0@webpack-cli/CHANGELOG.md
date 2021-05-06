# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.5.0](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.4.0...webpack-cli@4.5.0) (2021-02-02)

### Bug Fixes

-   avoid deprecation message ([9d6dbda](https://github.com/webpack/webpack-cli/commit/9d6dbda93da167a1aaad03f599105a4fe7849dc3))
-   error message on invalid plugin options ([#2380](https://github.com/webpack/webpack-cli/issues/2380)) ([f9ce1d3](https://github.com/webpack/webpack-cli/commit/f9ce1d30b83bf0e0b4d91498d012c13c208e6e67))
-   improve description for 'configtest' command ([#2379](https://github.com/webpack/webpack-cli/issues/2379)) ([311bae3](https://github.com/webpack/webpack-cli/commit/311bae336d83424c800e553b6ef40242d967685c))

### Features

-   add the `--node-env` flag ([#2388](https://github.com/webpack/webpack-cli/issues/2388)) ([e5126f1](https://github.com/webpack/webpack-cli/commit/e5126f10b6622437c0541c25be2a610a82c1df04))
-   entries syntax ([#2369](https://github.com/webpack/webpack-cli/issues/2369)) ([6b31614](https://github.com/webpack/webpack-cli/commit/6b3161479578f572f803f579c7e71073eb797184))
-   support ES module configuration format ([#2381](https://github.com/webpack/webpack-cli/issues/2381)) ([aebdbbc](https://github.com/webpack/webpack-cli/commit/aebdbbc1f6e2761e7821cb3660bea686cce7b587))

# [4.4.0](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.3.1...webpack-cli@4.4.0) (2021-01-19)

### Bug Fixes

-   better description for --no-watch-options-stdin ([#2288](https://github.com/webpack/webpack-cli/issues/2288)) ([4ee8665](https://github.com/webpack/webpack-cli/commit/4ee8665e01e8dce16448e0a4d3dd2293731695ab))
-   double commands output in help ([#2298](https://github.com/webpack/webpack-cli/issues/2298)) ([efe81e9](https://github.com/webpack/webpack-cli/commit/efe81e986a6dca5cc9b72a5c9312dc21409f65b1))
-   pass all `argv` to configurations when `serve` command used ([#2345](https://github.com/webpack/webpack-cli/issues/2345)) ([5070b9b](https://github.com/webpack/webpack-cli/commit/5070b9bcbd5bdac00088d0c21486ad181a4df000))
-   respect `--stats`, `--color` and `--no-color` option for serve c… ([#2312](https://github.com/webpack/webpack-cli/issues/2312)) ([73d3fec](https://github.com/webpack/webpack-cli/commit/73d3feced18b4e3708f958707326a6642a594cf2))
-   show exact package name while prompting for installation ([#2338](https://github.com/webpack/webpack-cli/issues/2338)) ([ffc93e5](https://github.com/webpack/webpack-cli/commit/ffc93e556d784e2d4409cb0d3a92d737850996f4))
-   webpack installation prompt message ([#2316](https://github.com/webpack/webpack-cli/issues/2316)) ([3659c5e](https://github.com/webpack/webpack-cli/commit/3659c5e529fe1319251ef1c713d6cc758f7f5353))

### Features

-   `configtest` validate default configuration ([#2354](https://github.com/webpack/webpack-cli/issues/2354)) ([487691a](https://github.com/webpack/webpack-cli/commit/487691abc8d817f5b3c1ab87743d7235ff15d956))
-   added `build` command (aliases - 'bundle' and 'b') ([7590f66](https://github.com/webpack/webpack-cli/commit/7590f66663ce701d52d9276c3adf9dbdfd1a0fa4))
-   added the `watch` command ([#2357](https://github.com/webpack/webpack-cli/issues/2357)) ([9693f7d](https://github.com/webpack/webpack-cli/commit/9693f7d9543a8fce610c4ef903ccca0d12d229a1))
-   allow to pass parseOption to CLI class ([#2299](https://github.com/webpack/webpack-cli/issues/2299)) ([2af0801](https://github.com/webpack/webpack-cli/commit/2af08013852a95c6f6462c56a9994a4ee28c6ea1))
-   allow to use `help` command to show option information ([#2353](https://github.com/webpack/webpack-cli/issues/2353)) ([15eb411](https://github.com/webpack/webpack-cli/commit/15eb411237dcdcf0db7a501c103fe53f9b82903f))
-   new `configtest` command ([#2303](https://github.com/webpack/webpack-cli/issues/2303)) ([eb7b189](https://github.com/webpack/webpack-cli/commit/eb7b18937d045261a5b20ca8356e8b4ae4dfcaad))
-   show multiple suggestions on unknown options ([#2349](https://github.com/webpack/webpack-cli/issues/2349)) ([7314d6c](https://github.com/webpack/webpack-cli/commit/7314d6ca927473da2f355a7d356a943471488606))

## [4.3.1](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.3.0...webpack-cli@4.3.1) (2020-12-31)

### Bug Fixes

-   error message on not installed module loaders for configuration ([#2282](https://github.com/webpack/webpack-cli/issues/2282)) ([29eaa8e](https://github.com/webpack/webpack-cli/commit/29eaa8e843510e020ac4b57a13622df40713fe27))
-   peer dependencies ([#2284](https://github.com/webpack/webpack-cli/issues/2284)) ([083f2a0](https://github.com/webpack/webpack-cli/commit/083f2a069d6dc0a3b9492eb3f205474ba843acfd))
-   provide useful error on unknown command ([d6380bb](https://github.com/webpack/webpack-cli/commit/d6380bb6c6756d2a00ac20f2ffc454481d97e4d3))
-   the `--help` option is working without `webpack-dev-server` ([#2267](https://github.com/webpack/webpack-cli/issues/2267)) ([1dae54d](https://github.com/webpack/webpack-cli/commit/1dae54da94d3220437b9257efe512447023de1d3))
-   the `--progress` option is working with `--json` ([#2276](https://github.com/webpack/webpack-cli/issues/2276)) ([0595603](https://github.com/webpack/webpack-cli/commit/05956030cbb1491a2e9313732470bcd4ebe5a36d))

# [4.3.0](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.2.0...webpack-cli@4.3.0) (2020-12-25)

### Bug Fixes

-   fix problems with `--mode` and config resolution, there are situations when we resolve an invalid config file, the `--mode` option does not affect on config resolution, if you faced with an error after updating, please use the `--config` option
-   correct usage of cli-flags ([#2205](https://github.com/webpack/webpack-cli/issues/2205)) ([c8fc7d1](https://github.com/webpack/webpack-cli/commit/c8fc7d1f195800c4fbe54ed6533e694f40fa7a1b))
-   defer setting default mode to core ([#2095](https://github.com/webpack/webpack-cli/issues/2095)) ([3eb410e](https://github.com/webpack/webpack-cli/commit/3eb410e5d8f8e2149910b65f4a028c85f8af5d28))
-   respect the `--watch-options-stdin` option ([2d1e001](https://github.com/webpack/webpack-cli/commit/2d1e001e7f4f560c2b36607bd1b29dfe2aa32066))
-   respect `--color`/`--no-color` option ([#2042](https://github.com/webpack/webpack-cli/issues/2042)) ([09bd812](https://github.com/webpack/webpack-cli/commit/09bd8126e95c9675b1f6862451f629cd4c439adb))
-   stringify stats using streaming approach ([#2190](https://github.com/webpack/webpack-cli/issues/2190)) ([9bf4e92](https://github.com/webpack/webpack-cli/commit/9bf4e925757b02f7252073501562c95e762dc59b))
-   use logger for error with proper exit code ([#2076](https://github.com/webpack/webpack-cli/issues/2076)) ([2c9069f](https://github.com/webpack/webpack-cli/commit/2c9069fd1f7c0fb70f019900e4b841c5ea33975e))
-   reduce spammy logs ([#2206](https://github.com/webpack/webpack-cli/issues/2206)) ([9b3cc28](https://github.com/webpack/webpack-cli/commit/9b3cc283d7b74aa3bb26fe36c6110436b016e0d9))
-   respect the `infrastructureLogging.level` option (logger uses `stderr`) ([#2144](https://github.com/webpack/webpack-cli/issues/2144)) ([7daccc7](https://github.com/webpack/webpack-cli/commit/7daccc786a0eb4eeae4c5b3632fc28240a696170))
-   respect all options from command line for the `server` command
-   `help` and `version` output
-   respect `stats` from the config (webpack@4) ([#2098](https://github.com/webpack/webpack-cli/issues/2098)) ([2d6e5c6](https://github.com/webpack/webpack-cli/commit/2d6e5c6f4ed967368a81742bf347e39f24ee16c8))
-   fixed colors work with multi compiler mode (webpack@4)

### Features

-   add `bundle` command (alias for `webpack [options]`)
-   add `pnpm` support for package installation ([#2040](https://github.com/webpack/webpack-cli/issues/2040)) ([46cba36](https://github.com/webpack/webpack-cli/commit/46cba367f06a6354fe98fcb15e7771e819feeac0))

# [4.2.0](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.1.0...webpack-cli@4.2.0) (2020-11-04)

### Bug Fixes

-   --config-name behaviour for fuctional configs ([#2006](https://github.com/webpack/webpack-cli/issues/2006)) ([29ecf8d](https://github.com/webpack/webpack-cli/commit/29ecf8dbcd1c5c7d75fc7fb1634107697832d952))
-   assign cache value for default configs ([#2013](https://github.com/webpack/webpack-cli/issues/2013)) ([d2e3c74](https://github.com/webpack/webpack-cli/commit/d2e3c74d32b0141c694259cf4f31e6c48b0f681d))
-   callback deprecation ([#1977](https://github.com/webpack/webpack-cli/issues/1977)) ([2cb0c0e](https://github.com/webpack/webpack-cli/commit/2cb0c0e383670949ce31231edbfda514f47c3dfc))
-   handle core flags for webpack 4 ([#2023](https://github.com/webpack/webpack-cli/issues/2023)) ([ea66a7e](https://github.com/webpack/webpack-cli/commit/ea66a7e3ec6eabcc439b96acb21e2a25be2e35e5))
-   help and version functionality ([#1972](https://github.com/webpack/webpack-cli/issues/1972)) ([e8010b3](https://github.com/webpack/webpack-cli/commit/e8010b3aac695971e542ad4d3584ce534da39b8f))

### Features

-   export utils from core for other packages ([#2011](https://github.com/webpack/webpack-cli/issues/2011)) ([3004549](https://github.com/webpack/webpack-cli/commit/3004549c06b3fe00708d8e1eecf42419e0f72f66))
-   progress supports string argument ([#2000](https://github.com/webpack/webpack-cli/issues/2000)) ([f13346e](https://github.com/webpack/webpack-cli/commit/f13346e6acb46e982a5d20fa1d2ae56fc52523dc))
-   suggest the closest match based on the Levenshtein distance algorithm ([#2010](https://github.com/webpack/webpack-cli/issues/2010)) ([491a582](https://github.com/webpack/webpack-cli/commit/491a582620b64ed4acbccd04f687adc28a5e4cff))

# [4.1.0](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.0.0...webpack-cli@4.1.0) (2020-10-19)

### Bug Fixes

-   avoid unnecessary stringify ([#1920](https://github.com/webpack/webpack-cli/issues/1920)) ([5ef1e7b](https://github.com/webpack/webpack-cli/commit/5ef1e7b074390406b76cb3e25dd90f045e1bd8a2))
-   colored output ([#1944](https://github.com/webpack/webpack-cli/issues/1944)) ([2bbbb14](https://github.com/webpack/webpack-cli/commit/2bbbb14ca9a404f2205c0f5a5515e73832ee6173))
-   move init command to separate package ([#1950](https://github.com/webpack/webpack-cli/issues/1950)) ([92ad475](https://github.com/webpack/webpack-cli/commit/92ad475d4b9606b5db7c31dd3666658301c95597))
-   output stacktrace on errors ([#1949](https://github.com/webpack/webpack-cli/issues/1949)) ([9ba9d6f](https://github.com/webpack/webpack-cli/commit/9ba9d6f460fb25fb79d52f4360239b8c4b471451))
-   run CLI after webpack installation ([#1951](https://github.com/webpack/webpack-cli/issues/1951)) ([564279e](https://github.com/webpack/webpack-cli/commit/564279e5b634a399647bcdb21449e5e6a7f0637e))
-   support any config name ([#1926](https://github.com/webpack/webpack-cli/issues/1926)) ([6f95b26](https://github.com/webpack/webpack-cli/commit/6f95b267bf6a3a3e71360f4de176a4ebbec3afa1))
-   support array of functions and promises ([#1946](https://github.com/webpack/webpack-cli/issues/1946)) ([2ace39b](https://github.com/webpack/webpack-cli/commit/2ace39b06117f558c0d8528cea9248253cbdf593))
-   watch mode and options ([#1931](https://github.com/webpack/webpack-cli/issues/1931)) ([258219a](https://github.com/webpack/webpack-cli/commit/258219a3bb606b228636e6373a3d20413c1f660e))

### Features

-   allow passing strings in env flag ([#1939](https://github.com/webpack/webpack-cli/issues/1939)) ([cc081a2](https://github.com/webpack/webpack-cli/commit/cc081a256181e34137a89d2e9d37b04280b3f180))

# [4.0.0](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.0.0-rc.1...webpack-cli@4.0.0) (2020-10-10)

### Bug Fixes

-   add compilation lifecycle in watch instance ([#1903](https://github.com/webpack/webpack-cli/issues/1903)) ([02b6d21](https://github.com/webpack/webpack-cli/commit/02b6d21eaa20166a7ed37816de716b8fc22b756a))
-   cleanup `package-utils` package ([#1822](https://github.com/webpack/webpack-cli/issues/1822)) ([fd5b92b](https://github.com/webpack/webpack-cli/commit/fd5b92b3cd40361daec5bf4486e455a41f4c9738))
-   cli-executer supplies args further up ([#1904](https://github.com/webpack/webpack-cli/issues/1904)) ([097564a](https://github.com/webpack/webpack-cli/commit/097564a851b36b63e0a6bf88144997ef65aa057a))
-   exit code for validation errors ([59f6303](https://github.com/webpack/webpack-cli/commit/59f63037fcbdbb8934b578b9adf5725bc4ae1235))
-   exit process in case of schema errors ([71e89b4](https://github.com/webpack/webpack-cli/commit/71e89b4092d953ea587cc4f606451ab78cbcdb93))

### Features

-   assign config paths in build dependencies in cache config ([#1900](https://github.com/webpack/webpack-cli/issues/1900)) ([7e90f11](https://github.com/webpack/webpack-cli/commit/7e90f110b119f36ef9def4f66cf4e17ccf1438cd))

# [4.0.0-rc.1](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.0.0-beta.8...webpack-cli@4.0.0-rc.1) (2020-10-06)

### Bug Fixes

-   cache issue ([#1862](https://github.com/webpack/webpack-cli/issues/1862)) ([305c188](https://github.com/webpack/webpack-cli/commit/305c18816ca6c4275c2755ae6b48d90a8cc85bd1))
-   check webpack installation before running cli ([#1827](https://github.com/webpack/webpack-cli/issues/1827)) ([be509fa](https://github.com/webpack/webpack-cli/commit/be509fac9a03e202e062229484bb10af7876968f))
-   defer setting default entry to core ([#1856](https://github.com/webpack/webpack-cli/issues/1856)) ([5da1f81](https://github.com/webpack/webpack-cli/commit/5da1f81ed101b024249c5cd4e043ec1397338782))
-   log error if --config-name is used without multiple configs ([#1874](https://github.com/webpack/webpack-cli/issues/1874)) ([f653409](https://github.com/webpack/webpack-cli/commit/f653409e3468849970dab354f84c5213da01122d))
-   mode behaviour ([#1824](https://github.com/webpack/webpack-cli/issues/1824)) ([9e9c70b](https://github.com/webpack/webpack-cli/commit/9e9c70bc1f30d90cebd91341e865abb46f9c269e))
-   only set output path on passing flag ([#1855](https://github.com/webpack/webpack-cli/issues/1855)) ([2f36b9d](https://github.com/webpack/webpack-cli/commit/2f36b9d858faedaf3a6adca10a529d9837c0dd24))
-   show warning if bail and watch are used together ([#1804](https://github.com/webpack/webpack-cli/issues/1804)) ([6140b24](https://github.com/webpack/webpack-cli/commit/6140b24d08990aa807070f105d46a92e18855c9e))
-   warning should not result in non-zero exit code ([#1872](https://github.com/webpack/webpack-cli/issues/1872)) ([ae9539d](https://github.com/webpack/webpack-cli/commit/ae9539d20eab2172118f61f7a9ba7e26541e16a2))

### Features

-   add --analyze flag ([#1853](https://github.com/webpack/webpack-cli/issues/1853)) ([e6d210a](https://github.com/webpack/webpack-cli/commit/e6d210a66b899023b1f39bb33cce7a9b83a5b803))
-   allow users to store stats as json to a file ([#1835](https://github.com/webpack/webpack-cli/issues/1835)) ([3907517](https://github.com/webpack/webpack-cli/commit/3907517b6afff46ddab51e32ada0357fc9763117))

# 4.0.0-beta.9 (2020-09-19)

### Bug Fixes

-   **serve:** merge CLI and devServer options correctly ([#1649](https://github.com/webpack/webpack-cli/issues/1649)) ([2cdf5ce](https://github.com/webpack/webpack-cli/commit/2cdf5ce159f63ac65b33f4aca4c82fa1e959fef5))
-   **utils:** respect package-lock.json ([#1375](https://github.com/webpack/webpack-cli/issues/1375)) ([ce8ec5a](https://github.com/webpack/webpack-cli/commit/ce8ec5a9f56ab5c1ce30742dced56dcbea237600))
-   **webpack-cli:** add configuration for mode option none ([#1303](https://github.com/webpack/webpack-cli/issues/1303)) ([a6930ac](https://github.com/webpack/webpack-cli/commit/a6930ac7aeea39d4b23480b1dfc05baff7b73460))
-   **webpack-cli:** add value none in mode usage ([#1411](https://github.com/webpack/webpack-cli/issues/1411)) ([66ac5b2](https://github.com/webpack/webpack-cli/commit/66ac5b239cfad99b84754c512e5982dc0902e9dd))
-   **webpack-cli:** correct cli-flags usage ([#1441](https://github.com/webpack/webpack-cli/issues/1441)) ([fb3660d](https://github.com/webpack/webpack-cli/commit/fb3660dd5cab8c596607110de14cacd98f255e34))
-   **webpack-cli:** handle promise rejection with package installation ([#1284](https://github.com/webpack/webpack-cli/issues/1284)) ([eb1112e](https://github.com/webpack/webpack-cli/commit/eb1112edf05b0a1bc83dced0e83987e4f459174c))
-   **webpack-cli:** prefer import local ([#1345](https://github.com/webpack/webpack-cli/issues/1345)) ([1af3bef](https://github.com/webpack/webpack-cli/commit/1af3befa6e680d8ee8e58dff8162ebb343755997))
-   **webpack-cli:** prefetch flag implementation ([#1583](https://github.com/webpack/webpack-cli/issues/1583)) ([d5d7682](https://github.com/webpack/webpack-cli/commit/d5d76828e29acf209ae665a91c61d849fd616d9e))
-   **webpack-cli:** remove invalid stats warning with json flag ([#1587](https://github.com/webpack/webpack-cli/issues/1587)) ([1fe4674](https://github.com/webpack/webpack-cli/commit/1fe4674b7bcca06fed9c55b34c9ee141703567f6))
-   🐛 do not apply own defaults while setting mode ([#1565](https://github.com/webpack/webpack-cli/issues/1565)) ([4ca25bc](https://github.com/webpack/webpack-cli/commit/4ca25bc01d8ea51fdcb5aea15fd13aefd6a1aa71))
-   allow unknown files to use default require as fallback ([#1747](https://github.com/webpack/webpack-cli/issues/1747)) ([b071623](https://github.com/webpack/webpack-cli/commit/b071623ae67a9f9528b02e07376044d851ad378a))
-   **webpack-cli:** verbose flag functionality ([#1549](https://github.com/webpack/webpack-cli/issues/1549)) ([e15d9cd](https://github.com/webpack/webpack-cli/commit/e15d9cdc42627b87c9e666509f008826e0032358))
-   ci for webpack@beta.30 ([#1801](https://github.com/webpack/webpack-cli/issues/1801)) ([cb38d63](https://github.com/webpack/webpack-cli/commit/cb38d6311f59679a0680344e0eecf39803ebc5a1))
-   compatibility with webpack@next ([#1779](https://github.com/webpack/webpack-cli/issues/1779)) ([fc8c18d](https://github.com/webpack/webpack-cli/commit/fc8c18dcdae28b4d5b0b65d02b0a2b916b40bae4))
-   consistent webpack plugin name ([#1480](https://github.com/webpack/webpack-cli/issues/1480)) ([145c552](https://github.com/webpack/webpack-cli/commit/145c552d1ace3303607fe4d204106fe9437e24a0))
-   json flag, enable tests ([#1460](https://github.com/webpack/webpack-cli/issues/1460)) ([d268e13](https://github.com/webpack/webpack-cli/commit/d268e13aeca3321be6dfad29612645fde954a5db))
-   prevent info from running unnecessarily ([#1650](https://github.com/webpack/webpack-cli/issues/1650)) ([ddee5ad](https://github.com/webpack/webpack-cli/commit/ddee5ad01eee0a261881348e4de013cfa5942e55))
-   promise support in config ([#1666](https://github.com/webpack/webpack-cli/issues/1666)) ([7489e63](https://github.com/webpack/webpack-cli/commit/7489e639d13e8b89690a50595eb48214e9cdb1d9))
-   rename sourcemap flag to devtool ([#1723](https://github.com/webpack/webpack-cli/issues/1723)) ([8623343](https://github.com/webpack/webpack-cli/commit/8623343c4a375be35860735c507e44548295d4e5))
-   set mode=production by default ([#1688](https://github.com/webpack/webpack-cli/issues/1688)) ([8360df7](https://github.com/webpack/webpack-cli/commit/8360df76474bf7923ae201b895e0ae98266d6893))
-   show version information for plugin and loader ([#1661](https://github.com/webpack/webpack-cli/issues/1661)) ([1ad71e4](https://github.com/webpack/webpack-cli/commit/1ad71e4aa838e4b4655e12bddca64e1c0ef2044e))
-   **webpack-cli:** to void defaultEntry override the webpack config entry ([#1289](https://github.com/webpack/webpack-cli/issues/1289)) ([99ff047](https://github.com/webpack/webpack-cli/commit/99ff04779cad1a90d8ac47345db5f8540c6ddc23)), closes [#1288](https://github.com/webpack/webpack-cli/issues/1288) [#1288](https://github.com/webpack/webpack-cli/issues/1288) [#1288](https://github.com/webpack/webpack-cli/issues/1288)
-   supply argv to config with functions ([#1721](https://github.com/webpack/webpack-cli/issues/1721)) ([2f05940](https://github.com/webpack/webpack-cli/commit/2f0594084a2d676dfe0675e54e967099c201f30c))
-   throw err when supplied config is absent ([#1760](https://github.com/webpack/webpack-cli/issues/1760)) ([86dfe51](https://github.com/webpack/webpack-cli/commit/86dfe514a5b5de38f631a02e5211d10f32c536b9))
-   throw error for invalid args ([#1462](https://github.com/webpack/webpack-cli/issues/1462)) ([25b3e04](https://github.com/webpack/webpack-cli/commit/25b3e04637db64b7f584e9badf9f8e59de978b7f))
-   typo in Compiler.js ([#1580](https://github.com/webpack/webpack-cli/issues/1580)) ([e1ccad4](https://github.com/webpack/webpack-cli/commit/e1ccad453cefb9e6a115bb87ae472843e14fb8aa))
-   use appropriate exit codes ([#1755](https://github.com/webpack/webpack-cli/issues/1755)) ([83f73b0](https://github.com/webpack/webpack-cli/commit/83f73b056e224301b871bee5e9b7254e64e84e95))
-   use compiler.apply for Progress Plugin ([#1772](https://github.com/webpack/webpack-cli/issues/1772)) ([e8f2f20](https://github.com/webpack/webpack-cli/commit/e8f2f207159ad74cfa0f3a4bc9f97bf12a9b9836))
-   use fileTypes from interpret ([#1690](https://github.com/webpack/webpack-cli/issues/1690)) ([d8f028e](https://github.com/webpack/webpack-cli/commit/d8f028edc98f28c354bfd48f7069bb52244d35da))
-   warn about merge config resolution cases ([#1674](https://github.com/webpack/webpack-cli/issues/1674)) ([bb5c7b0](https://github.com/webpack/webpack-cli/commit/bb5c7b0ed4005d523572e69c6bc924fdb5cf7306))

### Code Refactoring

-   remove plugin flag ([#1571](https://github.com/webpack/webpack-cli/issues/1571)) ([e4a6b7b](https://github.com/webpack/webpack-cli/commit/e4a6b7bf94776832afb948389b4ec7bf63f9911d))
-   💡 remove defaults flag ([#1543](https://github.com/webpack/webpack-cli/issues/1543)) ([a905590](https://github.com/webpack/webpack-cli/commit/a9055902ea27c3b3ea66c334e6a8aa2f1848b6be))

### Features

-   **webpack-cli:** --version for external packages ([#1421](https://github.com/webpack/webpack-cli/issues/1421)) ([756a8ff](https://github.com/webpack/webpack-cli/commit/756a8ff9640f3d65b49c14fe782dac9f2936d7d5))
-   **webpack-cli:** add --no-hot flag ([#1591](https://github.com/webpack/webpack-cli/issues/1591)) ([31fcaf3](https://github.com/webpack/webpack-cli/commit/31fcaf3ed64794a449a23588a37440d32d7e6baa))
-   **webpack-cli:** add --no-stats flag ([#1654](https://github.com/webpack/webpack-cli/issues/1654)) ([597eff7](https://github.com/webpack/webpack-cli/commit/597eff731830f62adce82661612e5fdcdad7b4cd))
-   **webpack-cli:** add alias for version ([#1405](https://github.com/webpack/webpack-cli/issues/1405)) ([6b9461e](https://github.com/webpack/webpack-cli/commit/6b9461ecf6148933ec643ae9b8315fd2b2b0dccb))
-   **webpack-cli:** add mode argument validation ([#1290](https://github.com/webpack/webpack-cli/issues/1290)) ([e273303](https://github.com/webpack/webpack-cli/commit/e2733038b11715c5f93399a3d3d72b6755781d26))
-   allow multiple types for --stats ([ca2d593](https://github.com/webpack/webpack-cli/commit/ca2d593badfb8b5884d42d2e36a7ba6fa5a540df))
-   **webpack-cli:** add no-mode flag ([#1276](https://github.com/webpack/webpack-cli/issues/1276)) ([a069d73](https://github.com/webpack/webpack-cli/commit/a069d73fe420151f97a39cc50bc3865b981595e1))
-   🎸 add support for env flag ([#1598](https://github.com/webpack/webpack-cli/issues/1598)) ([7249153](https://github.com/webpack/webpack-cli/commit/72491539bb06986d28bd55a1b112760435cade9d))
-   add --config-name flag ([#1753](https://github.com/webpack/webpack-cli/issues/1753)) ([d3ed19a](https://github.com/webpack/webpack-cli/commit/d3ed19a96811b98caa0ea0de0f8d7e76fe06879d))
-   add aliases to all available commands ([#1644](https://github.com/webpack/webpack-cli/issues/1644)) ([9352027](https://github.com/webpack/webpack-cli/commit/93520270f4bfdbf1b70ed3f02e8fe34fae51e246))
-   add init to webpack-cli ([#1609](https://github.com/webpack/webpack-cli/issues/1609)) ([5f4f3ea](https://github.com/webpack/webpack-cli/commit/5f4f3ea44a8e71ffb964a31948264623a6a75e2b))
-   add name flag ([#1757](https://github.com/webpack/webpack-cli/issues/1757)) ([ad0779f](https://github.com/webpack/webpack-cli/commit/ad0779fc53776cbd9048d033d54b7a8e9de43e8a))
-   add stats detailed option ([#1359](https://github.com/webpack/webpack-cli/issues/1359)) ([3e649e9](https://github.com/webpack/webpack-cli/commit/3e649e9796fd6756aed1b30aae9be63518db4dc5))
-   **webpack-cli:** allow multiple entry files ([#1619](https://github.com/webpack/webpack-cli/issues/1619)) ([ac2e52c](https://github.com/webpack/webpack-cli/commit/ac2e52c2ef8aa74aa795476be94ce7c968b8d1c5))
-   add support for .cjs config ([#1727](https://github.com/webpack/webpack-cli/issues/1727)) ([55ab016](https://github.com/webpack/webpack-cli/commit/55ab016c0a8ff1be1ccf8d36673e4391918647ba))
-   add support for merging multiple configurations ([#1768](https://github.com/webpack/webpack-cli/issues/1768)) ([b1e7024](https://github.com/webpack/webpack-cli/commit/b1e70244a625098633d09b04d7f772cfe18272ec))
-   add support for none config in dotfolder ([#1637](https://github.com/webpack/webpack-cli/issues/1637)) ([28526a6](https://github.com/webpack/webpack-cli/commit/28526a6b9a45e9b577a243782f14ef5a279739aa))
-   add support to spawn multiple compilers with different configs ([#1765](https://github.com/webpack/webpack-cli/issues/1765)) ([c63ab29](https://github.com/webpack/webpack-cli/commit/c63ab29e896c0d0fa3df0d26215172651e7edee8))
-   allow multiple targets ([#1799](https://github.com/webpack/webpack-cli/issues/1799)) ([1724ddb](https://github.com/webpack/webpack-cli/commit/1724ddb9067d5c5ba2654d4e5473ee9de5610825))
-   allow only specified negated flags ([#1613](https://github.com/webpack/webpack-cli/issues/1613)) ([885e0a2](https://github.com/webpack/webpack-cli/commit/885e0a222fca9622908c9314fd802c771b9f2b91))
-   allow using cjs as default config ([#1775](https://github.com/webpack/webpack-cli/issues/1775)) ([aaaa07b](https://github.com/webpack/webpack-cli/commit/aaaa07bd510cdd3d0b30cb69eb622d8798bd15eb))
-   parse Number flags ([#1652](https://github.com/webpack/webpack-cli/issues/1652)) ([b319c3a](https://github.com/webpack/webpack-cli/commit/b319c3ac209582546f30a248a94c10eede6da50e))
-   **webpack-cli:** allow negative property for cli-flags ([#1668](https://github.com/webpack/webpack-cli/issues/1668)) ([e7b46c2](https://github.com/webpack/webpack-cli/commit/e7b46c24514d77fcdd67067cded3154aaa98e48a))
-   **webpack-cli:** import flags from webpack core ([#1630](https://github.com/webpack/webpack-cli/issues/1630)) ([f478cc9](https://github.com/webpack/webpack-cli/commit/f478cc9810a17e828d96a5c9439992ecac86fc26))
-   **webpack-cli:** webpack stats ([#1299](https://github.com/webpack/webpack-cli/issues/1299)) ([0cbb270](https://github.com/webpack/webpack-cli/commit/0cbb2702a1e581150bb8e38dc9f361331179c406))
-   serve integration ([#1712](https://github.com/webpack/webpack-cli/issues/1712)) ([d3e2936](https://github.com/webpack/webpack-cli/commit/d3e29368c40ee47e4f7a07c41281714645e20ea7))
-   show up cli flag aliases with webpack help <arg> ([#1647](https://github.com/webpack/webpack-cli/issues/1647)) ([d087c61](https://github.com/webpack/webpack-cli/commit/d087c61a8a64359a8f520b4c3916948cb846a55c))
-   support command aliases with webpack-cli version ([#1664](https://github.com/webpack/webpack-cli/issues/1664)) ([a637801](https://github.com/webpack/webpack-cli/commit/a6378015ef1c51a7eb3eb85858f8109dd8c2a50a))
-   support multiple env params ([#1715](https://github.com/webpack/webpack-cli/issues/1715)) ([d315443](https://github.com/webpack/webpack-cli/commit/d3154431e559f736d8beaf6ca98b12a59b80e9bd))
-   validate user input ([#1610](https://github.com/webpack/webpack-cli/issues/1610)) ([3842a49](https://github.com/webpack/webpack-cli/commit/3842a49a64b65865720e75f8967daf56528abc8d))

### Performance Improvements

-   do not spawn new process for running webpack ([#1741](https://github.com/webpack/webpack-cli/issues/1741)) ([e06392a](https://github.com/webpack/webpack-cli/commit/e06392ae531d111dab9603c785001338740f42ab))

### BREAKING CHANGES

-   🧨 removed --plugin without any replacement

Co-authored-by: Anshuman Verma <anshu.av97@gmail.com>

-   the `defaults` options was removed without replacement

# [4.0.0-beta.8](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.0.0-beta.7...webpack-cli@4.0.0-beta.8) (2020-03-02)

**Note:** Version bump only for package webpack-cli

# [4.0.0-beta.7](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.0.0-beta.6...webpack-cli@4.0.0-beta.7) (2020-02-29)

### Bug Fixes

-   **webpack-cli:** fixed support for SCSS entry points ([#1271](https://github.com/webpack/webpack-cli/issues/1271)) ([321bbe5](https://github.com/webpack/webpack-cli/commit/321bbe5d5da9b3c7781ce751133432952998aaa5))
-   **webpack-cli:** handle promise rejection happening with cli-executor ([#1269](https://github.com/webpack/webpack-cli/issues/1269)) ([afe97f6](https://github.com/webpack/webpack-cli/commit/afe97f69eac2540db94897c39c5bb467cf137e3c))

### Features

-   **webpack-cli:** create a cli executer ([#1255](https://github.com/webpack/webpack-cli/issues/1255)) ([c74574b](https://github.com/webpack/webpack-cli/commit/c74574b8015362def7463c3de9adff0e839735a3))

# [4.0.0-beta.6](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.0.0-beta.5...webpack-cli@4.0.0-beta.6) (2020-02-23)

**Note:** Version bump only for package webpack-cli

# [4.0.0-beta.5](https://github.com/webpack/webpack-cli/compare/webpack-cli@4.0.0-beta.4...webpack-cli@4.0.0-beta.5) (2020-02-23)

**Note:** Version bump only for package webpack-cli

# 4.0.0-beta.4 (2020-02-23)

### Features

-   **webpack-cli:** add progress bar for progress flag ([#1238](https://github.com/webpack/webpack-cli/issues/1238)) ([06129a1](https://github.com/webpack/webpack-cli/commit/06129a19a39495f54cbf1b123d24f1216b4cc0d9))
-   **webpack-cli:** added mode argument ([#1253](https://github.com/webpack/webpack-cli/issues/1253)) ([7a5b33d](https://github.com/webpack/webpack-cli/commit/7a5b33dcd5aa5a8ea37062ae93d1fc38cdb5464c))

## [4.0.0-beta.2](https://github.com/webpack/webpack-cli/compare/v3.3.5...v4.0.0-beta.2) (2020-02-11)

### Features

-   0cjs for array configs ([e233ed6](https://github.com/webpack/webpack-cli/commit/e233ed6661ea6453d7e6b005b73c6ecd05c871ac))
-   **chore:** refactor code to eliminate redundancy ([12cf389](https://github.com/webpack/webpack-cli/commit/12cf389f4550298c4646d99c9ac431658bb8ba8e))
-   **cli:** add helper to check if arg is the command name or alias ([28d303b](https://github.com/webpack/webpack-cli/commit/28d303bced6810a18a4f7bc6d8a0dba487f79433))
-   remove unneeded color ([b4cd29f](https://github.com/webpack/webpack-cli/commit/b4cd29fbad26e291687e90d10b3087331193b9f4))
-   **cli:** adds standard output flag ([#1206](https://github.com/webpack/webpack-cli/issues/1206)) ([b05e5eb](https://github.com/webpack/webpack-cli/commit/b05e5ebf918576ddd5a304dc86be0aed02352bfa))
-   add codeowners file ([1070038](https://github.com/webpack/webpack-cli/commit/10700386046bb1be908dfc48384d77aad44bf93f))
-   add mjs support ([5f38764](https://github.com/webpack/webpack-cli/commit/5f387641839419d3f536bb99ad6741f701b953de))
-   add-badge ([751ae5a](https://github.com/webpack/webpack-cli/commit/751ae5a4d3fb4895ffb8d28ef61b99c8454a438c))
-   always spawn a process for cli ([#1198](https://github.com/webpack/webpack-cli/issues/1198)) ([06171b3](https://github.com/webpack/webpack-cli/commit/06171b3c7c030985d4c6cf32e7512cb3795f73ba))
-   better defaults, cleanup ([1a467b6](https://github.com/webpack/webpack-cli/commit/1a467b67d937ac564a7f32f324107e1e1cdfd812))
-   create commands.js ([2c0c221](https://github.com/webpack/webpack-cli/commit/2c0c221e5f8774efa98cffb279abff164fe4898a))
-   drop extraneous block ([fa3aa2b](https://github.com/webpack/webpack-cli/commit/fa3aa2b86a2d938477b1b66b95614cd54cc95c9b))
-   env based config defaults ([be28c78](https://github.com/webpack/webpack-cli/commit/be28c782fb0b8f357acc6e41264d0d04c8b4236d))
-   help for commands ([0feefb3](https://github.com/webpack/webpack-cli/commit/0feefb3a77fd9452ee747e6f6fcc2d6405619f67))
-   help for core flags ([#1141](https://github.com/webpack/webpack-cli/issues/1141)) ([8f92cb9](https://github.com/webpack/webpack-cli/commit/8f92cb97f5877893c4f962855801e808bfe4f17b)), closes [#1168](https://github.com/webpack/webpack-cli/issues/1168)
-   merge ouputCommand into outputHelp ([5ab0024](https://github.com/webpack/webpack-cli/commit/5ab0024a8397bc681524727cbc2edc6bd59d33f2))
-   minor tweak ([7c273dc](https://github.com/webpack/webpack-cli/commit/7c273dc3ad786ba4b806ab55ddabc6be19f253dd))
-   refactor ([0505d05](https://github.com/webpack/webpack-cli/commit/0505d052ec41942efcf0b5f42f4ceed5cd9449d8))
-   refactor ([002a785](https://github.com/webpack/webpack-cli/commit/002a78576ee7f209042e7a49afbb76795e609422))
-   refactor ([ad7fe98](https://github.com/webpack/webpack-cli/commit/ad7fe986b9e556d2e52a025b77755cd860a0992c))
-   refactor ([cb8968d](https://github.com/webpack/webpack-cli/commit/cb8968d8a0f0d154aa50b9108be42910f3b73ea7))
-   refactor ([16c368f](https://github.com/webpack/webpack-cli/commit/16c368f9a88198ff497afee4598553cb1f800d23))
-   refactor ([07a2961](https://github.com/webpack/webpack-cli/commit/07a2961c1b0eedb80f49535ab52030d619761a1c))
-   refactor ([c991733](https://github.com/webpack/webpack-cli/commit/c991733dba068d1c397d09ab3dcc99e9bf21de74))
-   refactor ([4858fde](https://github.com/webpack/webpack-cli/commit/4858fdef6c42220b518e6fd412a34c03c8ccacbf))
-   refactor ([2b1ea4c](https://github.com/webpack/webpack-cli/commit/2b1ea4c3ba85d6c43d628b4141b51fd2b70d9ce1))
-   refactor ([dee2884](https://github.com/webpack/webpack-cli/commit/dee288441c7de4c117addc53876e8864e2c4a14f))
-   refactor group-helper ([807bcb4](https://github.com/webpack/webpack-cli/commit/807bcb426b2fb2fbb781cae871cd0a0f234c5a55))
-   refactor groups-config ([4bf86bc](https://github.com/webpack/webpack-cli/commit/4bf86bc196b3ee6334ccc3f32fdeedf5857b9491))
-   refactor groups-config ([00acc50](https://github.com/webpack/webpack-cli/commit/00acc50514b1782dc3c91a62d7214b2b6e9c022f))
-   refactor logic ([3efe4bb](https://github.com/webpack/webpack-cli/commit/3efe4bbb52c5db6876c33b2f68d04d5e09052ee4))
-   refactor test-utils ([d4873ad](https://github.com/webpack/webpack-cli/commit/d4873ad149bb4c90ba2077db7c1311d1f9c7931b))
-   Support `export default` from configuration files. ([0f23d03](https://github.com/webpack/webpack-cli/commit/0f23d03e6832a8571ed65044a50271f5fe253671))
-   support array-configs ([fa9d5c2](https://github.com/webpack/webpack-cli/commit/fa9d5c22b41458a71b91e73bfe48924a61ba6e3e))
-   support array-configs ([76ced4a](https://github.com/webpack/webpack-cli/commit/76ced4ab3324745a09237957e21e278cbdc7f0dc))
-   support negated flags ([239a67e](https://github.com/webpack/webpack-cli/commit/239a67ea4fa32b3da180f374732d4c4a761dc4ac))
-   **interpret:** use interpret ([31c856f](https://github.com/webpack/webpack-cli/commit/31c856f1c9db7a186a4ae32fa1f70396999b41cd))
-   tweak ([79021e3](https://github.com/webpack/webpack-cli/commit/79021e347d616df277484d79927085a0e08fc9a4))
-   update notify period ([0d83e49](https://github.com/webpack/webpack-cli/commit/0d83e493def6d5515b3f3537e73cbacd4c4a4516))
-   **init:** add as req dep ([fec5b25](https://github.com/webpack/webpack-cli/commit/fec5b25453d8035712e1ec2c81a8f10bc27e76be))
-   update outputCommand ([4f19ad4](https://github.com/webpack/webpack-cli/commit/4f19ad4fbf3d12cd46f6dd7faaea1d6db02ec197))
-   **cli:** make serve use webpack cli compiler ([ab862d2](https://github.com/webpack/webpack-cli/commit/ab862d2ab72be3e0c73d1a35e31c81cde3d3e006))
-   **defaults:** set entry obj defaults and add default flag ([4608167](https://github.com/webpack/webpack-cli/commit/4608167fd5ff7a9b201843bd050294da9eccfbdf))
-   **init:** write file correct, better defaults and write babelrc file ([3814d44](https://github.com/webpack/webpack-cli/commit/3814d44d97d519f0b0eae2cc5e400b1899848e37))
-   **serve:** add all flags, improve args parsing ([46ca4de](https://github.com/webpack/webpack-cli/commit/46ca4de11b16a3b29d800a150edf90b7562455ea))
-   **serve:** pass socket or port if no socket ([4668ea7](https://github.com/webpack/webpack-cli/commit/4668ea78e125a698e0988ead30c82bec0f9bb8e3))
-   **silent:** add new flag ([fcdc3f4](https://github.com/webpack/webpack-cli/commit/fcdc3f41f3aa55681b18fb5083279dbd91441d68))
-   Update README.md ([b3dc27e](https://github.com/webpack/webpack-cli/commit/b3dc27e8b9d93221ef57ff013018a532254dc989))
-   use jspluginswebpack ([da8fce2](https://github.com/webpack/webpack-cli/commit/da8fce23894315fc9921c51dfb58d77fbf35e8c9))

### Bug Fixes

-   various tests are now working ([#1168](https://github.com/webpack/webpack-cli/issues/1168)) ([287d8ee](https://github.com/webpack/webpack-cli/commit/287d8ee28afc69c8310828b0fa0919d40b6131af))
-   array to object check ([2398249](https://github.com/webpack/webpack-cli/commit/2398249dcf23232b15c22d330681ca19f442e394))
-   badge url placement ([8d33d15](https://github.com/webpack/webpack-cli/commit/8d33d15f7439e35696f354a9f057fa4550893648))
-   changed the path resolver call ([0080ce2](https://github.com/webpack/webpack-cli/commit/0080ce297482b83fb1f7dfdc0328e1734aa1713e))
-   config lookup ([762e3b9](https://github.com/webpack/webpack-cli/commit/762e3b9141503521d82a997a9f36f9d4612f0abf))
-   correct jscodeshift import ([0c67103](https://github.com/webpack/webpack-cli/commit/0c67103644ce6f51b0e43a48c80f76883de24b5d))
-   enable colors in ci ([7c9e0df](https://github.com/webpack/webpack-cli/commit/7c9e0df74cb88b4907e513c53218db9478cacc79))
-   extend notify period ([aff8352](https://github.com/webpack/webpack-cli/commit/aff8352eaa2419a356b13e19a2ad1168001cebca))
-   grammar within comment ([d482677](https://github.com/webpack/webpack-cli/commit/d4826774a628f12aeed4deb9382d390e5d800914))
-   ignore failing test case ([c643626](https://github.com/webpack/webpack-cli/commit/c6436261ccaa659ecad1e4f29104d860e4f6219c))
-   ignore failing tests ([444355a](https://github.com/webpack/webpack-cli/commit/444355aa22d0efc9eb0e887560d04a125061e321))
-   improve local configRegister file resolution ([32cc513](https://github.com/webpack/webpack-cli/commit/32cc513eb62abf6dd7e18d8bacf6d0400cc9020e)), closes [#746](https://github.com/webpack/webpack-cli/issues/746)
-   make init reolve linked packges ([#1006](https://github.com/webpack/webpack-cli/issues/1006)) ([187045a](https://github.com/webpack/webpack-cli/commit/187045a5cdfa7c32659c73b867587d0a2c1c29e1))
-   minor fix ([0d9aa9a](https://github.com/webpack/webpack-cli/commit/0d9aa9ac7868f0154209eb119b6244df55859af7))
-   **cli:** await external command execution, fix lint ([ce8f284](https://github.com/webpack/webpack-cli/commit/ce8f2840267c627539813f3b06956b9bf89584a3))
-   **cli:** missing package, fixed function call ([4ee4d41](https://github.com/webpack/webpack-cli/commit/4ee4d41afc82f28545bc6e6482f034bc13cdd0d7))
-   **create:** add default sw in create template ([#1153](https://github.com/webpack/webpack-cli/issues/1153)) ([edf65c2](https://github.com/webpack/webpack-cli/commit/edf65c2f0430c1c76d4f7004b338e46f56be35f2)), closes [#1152](https://github.com/webpack/webpack-cli/issues/1152) [#1152](https://github.com/webpack/webpack-cli/issues/1152) [#1152](https://github.com/webpack/webpack-cli/issues/1152)
-   **create:** handle create package errors gracefully ([#1159](https://github.com/webpack/webpack-cli/issues/1159)) ([aa6d82b](https://github.com/webpack/webpack-cli/commit/aa6d82b649c9a1f4c54566b80597576d9bb554b4)), closes [#1151](https://github.com/webpack/webpack-cli/issues/1151) [#1151](https://github.com/webpack/webpack-cli/issues/1151) [#1151](https://github.com/webpack/webpack-cli/issues/1151) [#1151](https://github.com/webpack/webpack-cli/issues/1151)
-   **deps:** add missing cz-customizable dep to allow committing ([68b1bbe](https://github.com/webpack/webpack-cli/commit/68b1bbe8f93685727ef5973b81dbe73e3fe0c3c7)), closes [#1040](https://github.com/webpack/webpack-cli/issues/1040)
-   **info:** minor fix in the info function ([7a5cc51](https://github.com/webpack/webpack-cli/commit/7a5cc511ff78177c71c17e91619320933014f157))
-   **init:** check defaults more precisely ([51831c7](https://github.com/webpack/webpack-cli/commit/51831c79bb701b7a21778ae7c90f7753a270c24d))
-   use includes instead ([76671cb](https://github.com/webpack/webpack-cli/commit/76671cb9b6b9e753c7872a31a836bbd69d9c4ce1))
-   **init:** fixed package template to include name param ([#1203](https://github.com/webpack/webpack-cli/issues/1203)) ([83c0056](https://github.com/webpack/webpack-cli/commit/83c0056999e82496ad24a1e965157491287ad895))
-   minor refactor ([a30a027](https://github.com/webpack/webpack-cli/commit/a30a02716c50b1c52c223c42eabe5dd1cbe29577))
-   minor tweak ([d21d6d3](https://github.com/webpack/webpack-cli/commit/d21d6d338fa7169929363d4fe60b8d7b8b39fcd1))
-   minor typo ([85d1a7c](https://github.com/webpack/webpack-cli/commit/85d1a7c26499400a65b88274b466818899b36da8))
-   plugin val ([b835e71](https://github.com/webpack/webpack-cli/commit/b835e711f5a7d96bf609161ba7b58bdd6acba426))
-   promise configurations ([ae3ec9b](https://github.com/webpack/webpack-cli/commit/ae3ec9bef7da3c06020d3b4cab877ede19f0d631))
-   refactor redundant code ([c7b77a0](https://github.com/webpack/webpack-cli/commit/c7b77a08d3fad0ba93605e69f21b939614c383e5))
-   remove else block ([2b36987](https://github.com/webpack/webpack-cli/commit/2b36987ce2aa030a476a58bb80737e881926528d))
-   remove extra ternary operator ([115709e](https://github.com/webpack/webpack-cli/commit/115709e4107f7c5e0ff0bfaf5183b6df7d87fdac))
-   remove failing test case ([e3e46b6](https://github.com/webpack/webpack-cli/commit/e3e46b6c58f45286a2194105d1fb92deb67d9c53))
-   remove for now the default value of the target ([#1171](https://github.com/webpack/webpack-cli/issues/1171)) ([2d56f79](https://github.com/webpack/webpack-cli/commit/2d56f790cfd6ed076c80afb0a6d613e56169c5c5))
-   Remove redundant await ([6910877](https://github.com/webpack/webpack-cli/commit/691087774f4c453ae597e7b67343b75a41027036))
-   remove unused variable ([b5510d8](https://github.com/webpack/webpack-cli/commit/b5510d882bf60a2249e0022d573b2a2fb2a06dad))
-   rephrase comment ([e11c1c8](https://github.com/webpack/webpack-cli/commit/e11c1c8012cad266a41b5fc810384c9b6fe90065))
-   revert ([b51df6a](https://github.com/webpack/webpack-cli/commit/b51df6aa2e3de60bf8a57e6b223fd64b48501436))
-   revert ([75f56c5](https://github.com/webpack/webpack-cli/commit/75f56c5478a1177fcfcbbf189de4fc101431e055))
-   revert ([f44d8a5](https://github.com/webpack/webpack-cli/commit/f44d8a57b29a77a897eccfb95df71edd9db75b32))
-   spread args to mono-repo ([7499dd3](https://github.com/webpack/webpack-cli/commit/7499dd37f116a4d65bf0983e742943d03c351ee7))
-   tweak ([b5add43](https://github.com/webpack/webpack-cli/commit/b5add43af0a742a925fee6200727f4358eb34749))
-   tweak ([d74efde](https://github.com/webpack/webpack-cli/commit/d74efde1352790bd7e854df61884d51a0c667e3e))
-   typo ([10618de](https://github.com/webpack/webpack-cli/commit/10618de2f2f91698dd5b7a9d12f74865ac4a1ecb))
-   typo fix ([dc3a5e6](https://github.com/webpack/webpack-cli/commit/dc3a5e64fd94a26338f7ba1bc36fc100ddbb4f9d))
-   update badge url ([0b1bbd7](https://github.com/webpack/webpack-cli/commit/0b1bbd7ac277a757fe0c8cde3773f6bda7a51467))
-   update comments ([7553ae7](https://github.com/webpack/webpack-cli/commit/7553ae76b6a2f84cb5cb69f73f1eb3613020775f))
-   Use ES6 object initializer shorthand ([f4cf9b1](https://github.com/webpack/webpack-cli/commit/f4cf9b198d0cf53ce1cb3251e24507be51b34f8b))
-   use webpack-log ([9bfb79c](https://github.com/webpack/webpack-cli/commit/9bfb79c54020ef5e93c2417b2bee2feb7bcce31b))
-   warn on unknown, plugin ([ae725c8](https://github.com/webpack/webpack-cli/commit/ae725c86a5c131470f6aee65cd6e6744264dea80))
-   **serve:** add flag to ext-dep list ([1277cc9](https://github.com/webpack/webpack-cli/commit/1277cc9173d9bfa0afb312097e2a4f611491f4ae))
-   warnings on lint ([b402179](https://github.com/webpack/webpack-cli/commit/b402179759f02310b60a026329d57b7c5b49a97e))
-   warnings on lint ([76db13c](https://github.com/webpack/webpack-cli/commit/76db13c22006dc17819447b34c1be9906b3492fe))
-   **init:** fixes config resolution on generating new configuration ([44fa20c](https://github.com/webpack/webpack-cli/commit/44fa20c5b4f791c44e2e3993f8c613d16dcc1bcd))
-   **progress:** make boolean ([49bc0a4](https://github.com/webpack/webpack-cli/commit/49bc0a47c28cda87abce314bcc828a1e229be7b5))
-   **serve:** add newline at helper end ([25071ce](https://github.com/webpack/webpack-cli/commit/25071ceae3bddcb8e05be8f2064dbbdc174cbe34))
-   **serve:** disable for now ([fcf6e3e](https://github.com/webpack/webpack-cli/commit/fcf6e3e0016422310674c70c371a0ed2bd12b37f))
-   **serve:** fix gitignore, fix lint problems ([18636c3](https://github.com/webpack/webpack-cli/commit/18636c3ef422e1dc2d3cfbe3ca368b1cef560a50))
-   **serve:** handle serve args as an array ([#1174](https://github.com/webpack/webpack-cli/issues/1174)) ([8aa1b7d](https://github.com/webpack/webpack-cli/commit/8aa1b7d5cd69d8ae1bcf98aad7f03618c6609fc7))
-   **serve:** relative imports ([1d9c2bc](https://github.com/webpack/webpack-cli/commit/1d9c2bc626dc97ba7e42b85e5b58f99af24a64ac))

### Chores

-   **actions:** add webpack version ([#1150](https://github.com/webpack/webpack-cli/issues/1150)) ([c1e8fdf](https://github.com/webpack/webpack-cli/commit/c1e8fdf622070ccca34bababe63c081e9e277b8f))
-   **bootstrap:** refactor code ([#1037](https://github.com/webpack/webpack-cli/issues/1037)) ([0bc9081](https://github.com/webpack/webpack-cli/commit/0bc90811644e37863a8b86c674b7ca807636540a))
-   **ci:** remove node 8 from the CI ([#1182](https://github.com/webpack/webpack-cli/issues/1182)) ([dae9982](https://github.com/webpack/webpack-cli/commit/dae998229c70f7775476ad9fb172d380d92896d4))
-   **ci:** update webpack installation ([#1170](https://github.com/webpack/webpack-cli/issues/1170)) ([25a2c6b](https://github.com/webpack/webpack-cli/commit/25a2c6b2488e4e01f2e950b7f7373cb7b25fc8a3))
-   **cli:** better group handling ([#1204](https://github.com/webpack/webpack-cli/issues/1204)) ([5e9639f](https://github.com/webpack/webpack-cli/commit/5e9639fb3349ffaddf5b604912e9775b99043d15))
-   **cli:** fix helper to use includes for dashed flag stripping ([9da9db4](https://github.com/webpack/webpack-cli/commit/9da9db49863fe7db8df6408229201a015da47bb7))
-   **cli:** fix var name to make more sense ([1e10979](https://github.com/webpack/webpack-cli/commit/1e10979a1ff18d7f177184df2b6780dbf166866c))
-   **cli:** it restores inquirer for prompting external commands ([#1201](https://github.com/webpack/webpack-cli/issues/1201)) ([70c04ea](https://github.com/webpack/webpack-cli/commit/70c04eac1bb6f8918b135117c30b554131642db6))
-   **cli:** show help when invalid flag is supplied ([#1051](https://github.com/webpack/webpack-cli/issues/1051)) ([6663e94](https://github.com/webpack/webpack-cli/commit/6663e94c20d69a9e8555bec015cab59311eddaac)), closes [#1046](https://github.com/webpack/webpack-cli/issues/1046) [#1046](https://github.com/webpack/webpack-cli/issues/1046)
-   **cli:** updated package lock ([f6381d1](https://github.com/webpack/webpack-cli/commit/f6381d19f5df4b321290bd67bf6f5a6ba1c13f90))
-   **compiler:** refactor emoji rendering in compiler ([012382c](https://github.com/webpack/webpack-cli/commit/012382c7521b30150c3ce7e32b9fbf1c1a6fb964))
-   **deps:** bump eslint-utils from 1.4.0 to 1.4.2 ([#1068](https://github.com/webpack/webpack-cli/issues/1068)) ([1f73911](https://github.com/webpack/webpack-cli/commit/1f73911593c2387a870fdb9264bcb58a10d006e6))
-   **deps:** bump handlebars from 4.1.2 to 4.7.2 in /packages/migrate ([#1180](https://github.com/webpack/webpack-cli/issues/1180)) ([5f37086](https://github.com/webpack/webpack-cli/commit/5f370868ccf1b07735b4ad0e731388fffc4e1048))
-   **deps:** bump handlebars from 4.1.2 to 4.7.2 in /packages/utils ([#1181](https://github.com/webpack/webpack-cli/issues/1181)) ([f2972e5](https://github.com/webpack/webpack-cli/commit/f2972e5dcb0fc1f7753b48c5075a3588a7d5bcb9))
-   **deps:** bump lodash from 4.17.11 to 4.17.15 in /packages/init ([95146fe](https://github.com/webpack/webpack-cli/commit/95146fe8c15fecdd15cb29aeec5b1e30417cc6d6))
-   **deps:** bump lodash from 4.17.11 to 4.17.15 in /packages/serve ([d1ad9f3](https://github.com/webpack/webpack-cli/commit/d1ad9f371e2a400c0d1bf562ad73d136dc070251))
-   **deps:** bump lodash from 4.17.11 to 4.17.15 in /packages/serve ([b3d7013](https://github.com/webpack/webpack-cli/commit/b3d7013805bfeb7679596748afc317a6376dd99b))
-   **deps:** bump lodash from 4.17.11 to 4.17.15 in /packages/utils ([7fe5fd4](https://github.com/webpack/webpack-cli/commit/7fe5fd486843928e5607658c4f5293180500059f))
-   **deps:** bump lodash in /packages/generate-loader ([87f9e9b](https://github.com/webpack/webpack-cli/commit/87f9e9b8da834e5cf6dfd79c97b7947556db7a29))
-   **deps:** bump lodash in /packages/generate-plugin ([a8ecb31](https://github.com/webpack/webpack-cli/commit/a8ecb31387a3d090dc455cafc002d6907fd37301))
-   **deps:** bump lodash in /packages/webpack-scaffold ([29de664](https://github.com/webpack/webpack-cli/commit/29de664f105d46736f06dbab534f7f559545b632))
-   **deps:** update deps and remove old type ([5af7e7a](https://github.com/webpack/webpack-cli/commit/5af7e7a17105adf455b3b8907910976cf3deb5f8))
-   **deps:** update sec vuln patches ([d2c6228](https://github.com/webpack/webpack-cli/commit/d2c62285add3e96894e94472b169f01557b2ef35))
-   **grammer:** changes depracated to removed ([732a80a](https://github.com/webpack/webpack-cli/commit/732a80ab2f6d47fbdf18a50f9880e6681c737a54))
-   **help:** refactor help for more cleaner code ([94a1ce0](https://github.com/webpack/webpack-cli/commit/94a1ce06ddd150a4ebf6ae54dfb8b4e8767e935d))
-   **info:** changes base ([a58c286](https://github.com/webpack/webpack-cli/commit/a58c286ba869811b63ebb604e1a9e796a2b06f22))
-   **init:** upgrade yeoman in generators/utils, slight generator error handling changes ([#1205](https://github.com/webpack/webpack-cli/issues/1205)) ([0255657](https://github.com/webpack/webpack-cli/commit/0255657cfe67fffb8583601fd2d4a334ab9a89da))
-   **lib:** refactored lib utils and groups ([#1140](https://github.com/webpack/webpack-cli/issues/1140)) ([237887b](https://github.com/webpack/webpack-cli/commit/237887b4847bcfad2239dbea70b6e08f276db3a4))
-   **lint:** auto linting ([8668783](https://github.com/webpack/webpack-cli/commit/8668783f259465131da0a6e7b2461c4dc0b75bd0))
-   **linting:** renable linting ([1e596d3](https://github.com/webpack/webpack-cli/commit/1e596d320b54d031e6b8373ab2233e600f094428))
-   **readme:** change of language ([41ee8ca](https://github.com/webpack/webpack-cli/commit/41ee8ca2d873f1ff8eb9a7aa804e90dbe4812171))
-   **ref:** fix code ([d213809](https://github.com/webpack/webpack-cli/commit/d2138096b2c2b0d7a2daa9f6b36af8404dd2840a))
-   **refactor:** rm logs ([e7a64d6](https://github.com/webpack/webpack-cli/commit/e7a64d68258bd08f623e67303f9aeebbe8d79c3c))
-   **register:** remove register in favor for logging ([da29064](https://github.com/webpack/webpack-cli/commit/da29064084d931a2baea890de4b198cbb1674ea2))
-   **serve:** allow js in serve package ([7e38b31](https://github.com/webpack/webpack-cli/commit/7e38b318576922cc5874297f771b369754e3f7b2))
-   **serve:** made dev server optional peer dep ([f580b8f](https://github.com/webpack/webpack-cli/commit/f580b8f06631a52e4a7bd3e990692484d38a1188))
-   **serve:** make dev server peer dep again ([6237d6c](https://github.com/webpack/webpack-cli/commit/6237d6cb3dffc3037eb055f50c22948da217c8ec))
-   **serve:** move dev server back to normal dependencies ([c2bf27d](https://github.com/webpack/webpack-cli/commit/c2bf27dc5430c455685ded6f2b3a977ab9c5eb22))
-   **serve:** refactor code to be more concise ([d2e3e80](https://github.com/webpack/webpack-cli/commit/d2e3e808ab63e2030acc0b76baafe68a4df66524))
-   **serve:** remove allowjs from tsconfig ([3c92b0a](https://github.com/webpack/webpack-cli/commit/3c92b0abad54b92bee947fa630f9a90c393ae4f5))
-   **serve:** remove dev server as an optional peer dep in favor of normal dep ([305a1dd](https://github.com/webpack/webpack-cli/commit/305a1dd7d3230a4106af3848cc53c47e251106f9))
-   **serve:** remove promise return from serve package ([#1091](https://github.com/webpack/webpack-cli/issues/1091)) ([2144a1b](https://github.com/webpack/webpack-cli/commit/2144a1b9aff842589617f4a968c0084d1a4c3ed1))
-   **serve:** update package lock ([1ddcf4a](https://github.com/webpack/webpack-cli/commit/1ddcf4a80765799df74ad26abdfdacd6150025aa))
-   **serve:** updated dev server and fixed newline problem ([b29ec8f](https://github.com/webpack/webpack-cli/commit/b29ec8f7c2b43419563a382c9414b1e314f17041))
-   **serve:** use cli flags from dev server package ([9b385f9](https://github.com/webpack/webpack-cli/commit/9b385f993e64d3c78f42ef38456b578ec7c94be4))
-   **utils:** fixes typo in scaffold ([bd5c1ce](https://github.com/webpack/webpack-cli/commit/bd5c1ce08a998f55e305876fc4ecabd90acf4bf8))
-   changed the split seperator ([078a1e4](https://github.com/webpack/webpack-cli/commit/078a1e4bbe8a6515ab8239859110d8a4967a1154))
-   add deps ([b19b233](https://github.com/webpack/webpack-cli/commit/b19b233e30b21c65499c4e79a6df87403c5dccd3))
-   add deps ([5b6cd4b](https://github.com/webpack/webpack-cli/commit/5b6cd4b17119dcfbae4a4bd8d314e35fcbb2e3af))
-   add flags for commands ([f1eb2b7](https://github.com/webpack/webpack-cli/commit/f1eb2b78524ebf81e296710f62472d161c0b301c))
-   add footer for consistency ([d22734c](https://github.com/webpack/webpack-cli/commit/d22734c7578cc847b5b6c3fd122d1c76d3f773db))
-   add links to cli flags info ([#1178](https://github.com/webpack/webpack-cli/issues/1178)) ([dcec3ae](https://github.com/webpack/webpack-cli/commit/dcec3ae4b0115c5f80e1612213ee200c426fea0f))
-   add more detailed test ([e02eac4](https://github.com/webpack/webpack-cli/commit/e02eac4f6a1ec2f7d9b0736dccbf860c996b577f))
-   add strict checks ([3edee26](https://github.com/webpack/webpack-cli/commit/3edee260fdc95ae1140e467811f7623fb8d9d38e))
-   add v3 as a tmp dep for dev-server ([425c590](https://github.com/webpack/webpack-cli/commit/425c590dc040835ab3f79be98824e5fefe09073a))
-   Added test case for providing unknown flags along with -… ([#1197](https://github.com/webpack/webpack-cli/issues/1197)) ([f25c557](https://github.com/webpack/webpack-cli/commit/f25c5570fa6057ecaad33a9580ff391f7af9491a))
-   added test for --json simple usecases ([aa5197b](https://github.com/webpack/webpack-cli/commit/aa5197b1ee1d12608f7aadb5e18f20961ae1a26b))
-   added tests with different config type ([3a84813](https://github.com/webpack/webpack-cli/commit/3a84813e68f51aae95b12141596b2ab58afeb1a4))
-   better output ([#1196](https://github.com/webpack/webpack-cli/issues/1196)) ([d72f9f8](https://github.com/webpack/webpack-cli/commit/d72f9f8d412fa0efbc3d5e9e556b40733afc767b))
-   bump webpack v ([e1a3410](https://github.com/webpack/webpack-cli/commit/e1a341033591d51ac9d9fcf2daf20efa3982aaae))
-   change arg in testutil ([11447ee](https://github.com/webpack/webpack-cli/commit/11447eeaf6ba3cf43d00c2552dd481f0a1fa5f5e))
-   change arg in testutil ([0005910](https://github.com/webpack/webpack-cli/commit/0005910975289c0fa6029d8dce9647aa048d7bcc))
-   changed the .bin to bin in entry test ([a4f735a](https://github.com/webpack/webpack-cli/commit/a4f735a903f2e0e5f571c26add47ba607b334f5e))
-   changed the outDir to entry test ([016db0c](https://github.com/webpack/webpack-cli/commit/016db0c411641a195281696ae0238fce03a1fcbc))
-   check for existing arr ([b46efe6](https://github.com/webpack/webpack-cli/commit/b46efe609ce7f3754b5c4efd7c866a2a29aad5e2))
-   expression ([bd6b787](https://github.com/webpack/webpack-cli/commit/bd6b787c502bd02b9a8e0ec274a961205add0262))
-   expression func ([ccbb7f2](https://github.com/webpack/webpack-cli/commit/ccbb7f2ea514c9e3e22c5ccdd95807aae60d63b6))
-   expression func ([ce968e4](https://github.com/webpack/webpack-cli/commit/ce968e40555495977fe4085cc525c2220a3dd434))
-   expression func ([721914b](https://github.com/webpack/webpack-cli/commit/721914ba1b4b8a3482ef67ccf2830a109c09b448))
-   fix sec issues ([6f8dd13](https://github.com/webpack/webpack-cli/commit/6f8dd1389083b64536479fbaad67fd22474005b1))
-   include comments ([941da90](https://github.com/webpack/webpack-cli/commit/941da90ebfcb6aa5ba07430465bf2d53a2c54c4f))
-   make src more readable ([2d10684](https://github.com/webpack/webpack-cli/commit/2d10684fff0d0971019d3e3dd4d2200bd1a400dc))
-   Minor code refactor adhering to ES6 semantics ([#1122](https://github.com/webpack/webpack-cli/issues/1122)) ([aed9b9e](https://github.com/webpack/webpack-cli/commit/aed9b9ebcc156d2ebf0eb4e91baea6fb1af5d916))
-   minor code refactoring ([#1105](https://github.com/webpack/webpack-cli/issues/1105)) ([a43940d](https://github.com/webpack/webpack-cli/commit/a43940d29977b64d9d7c662e5d5b94a00534513a))
-   minor code refactors ([517e756](https://github.com/webpack/webpack-cli/commit/517e756d6e5419de1cc80952fcbf20f5ca9a0ccb))
-   Minor typographical fixes ([#1183](https://github.com/webpack/webpack-cli/issues/1183)) ([a0ac134](https://github.com/webpack/webpack-cli/commit/a0ac134ff0d0a17c10387da99f5e96443e48bb15))
-   monorepo version update ([8097c5c](https://github.com/webpack/webpack-cli/commit/8097c5cf0fb6d2fa533168b4d97fbb373fa806ce))
-   move away from var ([ed3e868](https://github.com/webpack/webpack-cli/commit/ed3e868bac193b7616b17ee5c3bd1722f64b7772))
-   moved logger inside a module instead of having it inside the process ([#1179](https://github.com/webpack/webpack-cli/issues/1179)) ([e7cc639](https://github.com/webpack/webpack-cli/commit/e7cc63952a814de5b2b3690e31e4d2df3aa91f4b))
-   only output message on error ([90868f2](https://github.com/webpack/webpack-cli/commit/90868f2c83e000ac42f93162e4b3ea2485e9da9a))
-   pre-release ([4ca0de0](https://github.com/webpack/webpack-cli/commit/4ca0de0abd15a2b08297101a80ba49c2096178ce))
-   pre-release ([f64e37c](https://github.com/webpack/webpack-cli/commit/f64e37c9d96218291bb2273455f3cddb6a3a5013))
-   prevent weird behaviour of pre-commit hook ([#973](https://github.com/webpack/webpack-cli/issues/973)) ([ba471f8](https://github.com/webpack/webpack-cli/commit/ba471f87ba4ecc51fb532e864e5e21b88f22c5c9))
-   readd deps and fix linting ([82407e5](https://github.com/webpack/webpack-cli/commit/82407e5e1fee2ce7e8dd4cfa9596b99ed0cde4fc))
-   rebase ([652caf8](https://github.com/webpack/webpack-cli/commit/652caf8f86b4f95c4d5710afaf3d3aa2f0baec35))
-   rebase ([38524ec](https://github.com/webpack/webpack-cli/commit/38524ec7930b58ba1b03cded85f2e7200a84f44b))
-   rebase ([79137d0](https://github.com/webpack/webpack-cli/commit/79137d0800a161cb810236f384be48b5365e1a77))
-   rebase ([2cd4e65](https://github.com/webpack/webpack-cli/commit/2cd4e654efec6d85e8bf65330231ae9503217b89))
-   rebase ([8141e0e](https://github.com/webpack/webpack-cli/commit/8141e0e7b429ebd09b1c6e8bc61a4f065cf72dc3))
-   rebase ([b5fcf78](https://github.com/webpack/webpack-cli/commit/b5fcf784829eded844c30be196eb434dd16e8f5e))
-   rebase against next branch ([3812ea1](https://github.com/webpack/webpack-cli/commit/3812ea142a3116d577878ac98691c5fb904e5d7a))
-   refactor webpack-cli ([8a8bc72](https://github.com/webpack/webpack-cli/commit/8a8bc72c392602284bd99e01f8ac1fa63d514594))
-   remove debug flag ([d79cc45](https://github.com/webpack/webpack-cli/commit/d79cc45ccf542e2ae086ba83149d9d7be67de7ec))
-   remove disable line ([88df722](https://github.com/webpack/webpack-cli/commit/88df722cf53e6af77375683c6527af5142f2ec64))
-   remove old tests ([b131230](https://github.com/webpack/webpack-cli/commit/b1312304f3f9de9d7534c5968626be9255a77eec))
-   Remove redundant multiple property ([ecf4a38](https://github.com/webpack/webpack-cli/commit/ecf4a380509a8165dc5e38f4eef24b99368cb7bb))
-   removed the single depth folder search in gitignore ([3a3fb81](https://github.com/webpack/webpack-cli/commit/3a3fb8107feb8f8e6b0067e2f73f6c79867c3061))
-   removed the snapshot testing, added custom checks ([6e40a1b](https://github.com/webpack/webpack-cli/commit/6e40a1bdcabdfac9f981532789523db2f2f4d564))
-   rename flags to options ([ff532f4](https://github.com/webpack/webpack-cli/commit/ff532f4a3822f25d8be8763cd54d2d42c8094a39))
-   sec patch ([2f818ef](https://github.com/webpack/webpack-cli/commit/2f818ef6ec088df7af63b2cb7cfca1671bcd61b9))
-   sec patches ([020b1bf](https://github.com/webpack/webpack-cli/commit/020b1bf32df5c674e6e4cdb80ff64a3dbe19e05d))
-   set fallback devtool ([080c44c](https://github.com/webpack/webpack-cli/commit/080c44c241cf6e796388369edf11e1607efab0df))
-   update commands ([bf32074](https://github.com/webpack/webpack-cli/commit/bf32074472ecb0d4baf0fa16cc557f618cc83879))
-   update console logs to webpack-logs ([dc4c89c](https://github.com/webpack/webpack-cli/commit/dc4c89cfc63e4e9eb8011ab7c27f98ba58c3185c))
-   update dependences ([0f8a7f7](https://github.com/webpack/webpack-cli/commit/0f8a7f766789e13dd759bb9386d73bd39ae5be60))
-   update dependences ([915c9f3](https://github.com/webpack/webpack-cli/commit/915c9f39be93eb46aca441e5f32d7dc23818080e)), closes [#1148](https://github.com/webpack/webpack-cli/issues/1148)
-   update deps ([02d653f](https://github.com/webpack/webpack-cli/commit/02d653faba89a3114c715362547864f6b9eb291f))
-   update deps ([8b75e1c](https://github.com/webpack/webpack-cli/commit/8b75e1c7565bc3b121a45a0f7078b5e0774d5cdf))
-   update lockfiles ([f8ed0c6](https://github.com/webpack/webpack-cli/commit/f8ed0c62cc32d76af7fe0f32d8ebb01639c7e30c))
-   **utils:** move jest to dev-deps (closes [#1190](https://github.com/webpack/webpack-cli/issues/1190)) ([#1194](https://github.com/webpack/webpack-cli/issues/1194)) ([fb6e3fe](https://github.com/webpack/webpack-cli/commit/fb6e3fe941094e8f0ee65f5ab71567729d659643))
-   Update lib/bootstrap.js ([fa658b8](https://github.com/webpack/webpack-cli/commit/fa658b8214baa3fa11579dd6218de56437db0650))
-   update lockfiles ([44df902](https://github.com/webpack/webpack-cli/commit/44df902637a0ef2ae226c53d449774ac1b236737))
-   update lockfiles ([6b5ed74](https://github.com/webpack/webpack-cli/commit/6b5ed748bf28885814dd0709a29785bf17abd519))
-   update terser-webpack-plugin to the latest version ([#1172](https://github.com/webpack/webpack-cli/issues/1172)) ([9222016](https://github.com/webpack/webpack-cli/commit/9222016ba3872b255893efe7aec2f5dd6f9de7e0))
-   update test statements ([48f1cb5](https://github.com/webpack/webpack-cli/commit/48f1cb5f02b46d3289d643423c190428f98379ab))
-   update to webpack v5 ([e59bcd7](https://github.com/webpack/webpack-cli/commit/e59bcd7739cc2a8d41c795788c9738e2453dbea7))
-   update variable to be understandable ([9792c81](https://github.com/webpack/webpack-cli/commit/9792c8183cf8d7628d3e18b09101390a558079ca))
-   use filter instead ([c71a9f0](https://github.com/webpack/webpack-cli/commit/c71a9f05eca87afb3a9a792a6aa4fc04b5ea60f1))
-   use Object.keys in commands ([51af1e1](https://github.com/webpack/webpack-cli/commit/51af1e1453de30bc1a897f9e5a29c4877d2f4ed5))
-   use webpack next ([2030f69](https://github.com/webpack/webpack-cli/commit/2030f69cf1221af060988ec1ec899a20f5f30ff3))
-   wip ([641064a](https://github.com/webpack/webpack-cli/commit/641064a4bb40b9c845e921f538e0d886b2c32509))

### Documentation

-   remove deprecated packages description ([#979](https://github.com/webpack/webpack-cli/issues/979)) ([49e4adc](https://github.com/webpack/webpack-cli/commit/49e4adcd98dba87866d4b29216cad447e1223b0c))
-   **create:** migrate init package docs ([#1155](https://github.com/webpack/webpack-cli/issues/1155)) ([a9940bd](https://github.com/webpack/webpack-cli/commit/a9940bd44f97496606b51cecc361f3d03c99c513))
-   **readme:** adds deprecated warning and commands ([da13744](https://github.com/webpack/webpack-cli/commit/da13744e14fe02664ab2e7107cc52e6529e7378a))
-   **readme:** adds issue resolution time shield ([6cd4cb4](https://github.com/webpack/webpack-cli/commit/6cd4cb45b866c55548714535e864b7eb2d6cefba))
-   **webpack-scaffold:** remove unrelated links ([#1092](https://github.com/webpack/webpack-cli/issues/1092)) ([9f5d8b6](https://github.com/webpack/webpack-cli/commit/9f5d8b6056482376a6848ee069e2f7b4ad7184af))
-   Updated information regarding migrate command and a typo fix ([#1187](https://github.com/webpack/webpack-cli/issues/1187)) ([861e9f8](https://github.com/webpack/webpack-cli/commit/861e9f8b3453ca9dfc2b8f9abda86b248cdf80a5))
