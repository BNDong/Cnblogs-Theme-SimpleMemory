"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var path = _interopRequireWildcard(require("path"));

var os = _interopRequireWildcard(require("os"));

var _sourceMap = require("source-map");

var _schemaUtils = require("schema-utils");

var _serializeJavascript = _interopRequireDefault(require("serialize-javascript"));

var terserPackageJson = _interopRequireWildcard(require("terser/package.json"));

var _pLimit = _interopRequireDefault(require("p-limit"));

var _jestWorker = _interopRequireDefault(require("jest-worker"));

var schema = _interopRequireWildcard(require("./options.json"));

var _minify = require("./minify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** @typedef {import("schema-utils/declarations/validate").Schema} Schema */

/** @typedef {import("webpack").Compiler} Compiler */

/** @typedef {import("webpack").Compilation} Compilation */

/** @typedef {import("webpack").Rules} Rules */

/** @typedef {import("webpack").WebpackError} WebpackError */

/** @typedef {import("webpack").Asset} Asset */

/** @typedef {import("webpack").AssetInfo} AssetInfo */

/** @typedef {import("terser").ECMA} TerserECMA */

/** @typedef {import("terser").MinifyOptions} TerserMinifyOptions */

/** @typedef {import("jest-worker").default} JestWorker */

/** @typedef {import("source-map").RawSourceMap} RawSourceMap */

/** @typedef {import("./minify.js").InternalMinifyOptions} InternalMinifyOptions */

/** @typedef {import("./minify.js").InternalMinifyResult} InternalMinifyResult */

/** @typedef {JestWorker & { transform: (options: string) => InternalMinifyResult, minify: (options: InternalMinifyOptions) => InternalMinifyResult }} MinifyWorker */

/** @typedef {Object.<any, any> | TerserMinifyOptions} MinifyOptions */

/**
 * @callback ExtractCommentsFunction
 * @param {any} astNode
 * @param {{ value: string, type: 'comment1' | 'comment2' | 'comment3' | 'comment4', pos: number, line: number, col: number }} comment
 * @returns {boolean}
 */

/**
 * @typedef {boolean | string | RegExp | ExtractCommentsFunction} ExtractCommentsCondition
 */

/**
 * @typedef {string | ((fileData: any) => string)} ExtractCommentsFilename
 */

/**
 * @typedef {boolean | string | ((commentsFile: string) => string)} ExtractCommentsBanner
 */

/**
 * @typedef {Object} ExtractCommentsObject
 * @property {ExtractCommentsCondition} condition
 * @property {ExtractCommentsFilename} filename
 * @property {ExtractCommentsBanner} banner
 */

/**
 * @callback CustomMinifyFunction
 * @param {Object.<string, string>} file
 * @param {RawSourceMap | undefined} sourceMap
 * @param {MinifyOptions} minifyOptions
 */

/**
 * @typedef {ExtractCommentsCondition | ExtractCommentsObject} ExtractCommentsOptions
 */

/**
 * @typedef {Object} TerserPluginOptions
 * @property {Rules} [test]
 * @property {Rules} [include]
 * @property {Rules} [exclude]
 * @property {MinifyOptions} [terserOptions]
 * @property {ExtractCommentsOptions} [extractComments]
 * @property {boolean} [parallel]
 * @property {CustomMinifyFunction} [minify]
 */
class TerserPlugin {
  /**
   * @param {TerserPluginOptions} options
   */
  constructor(options = {}) {
    (0, _schemaUtils.validate)(
    /** @type {Schema} */
    schema, options, {
      name: "Terser Plugin",
      baseDataPath: "options"
    });
    const {
      minify,
      terserOptions = {},
      test = /\.[cm]?js(\?.*)?$/i,
      extractComments = true,
      parallel = true,
      include,
      exclude
    } = options;
    this.options = {
      test,
      extractComments,
      parallel,
      include,
      exclude,
      minify,
      terserOptions
    };
  }
  /**
   * @private
   * @param {any} input
   * @returns {boolean}
   */


  static isSourceMap(input) {
    // All required options for `new SourceMapConsumer(...options)`
    // https://github.com/mozilla/source-map#new-sourcemapconsumerrawsourcemap
    return Boolean(input && input.version && input.sources && Array.isArray(input.sources) && typeof input.mappings === "string");
  }
  /**
   * @private
   * @param {Error & { line: number, col: number}} error
   * @param {string} file
   * @param {Compilation["requestShortener"]} [requestShortener]
   * @param {SourceMapConsumer} [sourceMap]
   * @returns {WebpackError}
   */


  static buildError(error, file, requestShortener, sourceMap) {
    if (error.line) {
      const original = sourceMap && sourceMap.originalPositionFor({
        line: error.line,
        column: error.col
      });

      if (original && original.source && requestShortener) {
        return new Error(`${file} from Terser\n${error.message} [${requestShortener.shorten(original.source)}:${original.line},${original.column}][${file}:${error.line},${error.col}]${error.stack ? `\n${error.stack.split("\n").slice(1).join("\n")}` : ""}`);
      }

      return new Error(`${file} from Terser\n${error.message} [${file}:${error.line},${error.col}]${error.stack ? `\n${error.stack.split("\n").slice(1).join("\n")}` : ""}`);
    }

    if (error.stack) {
      return new Error(`${file} from Terser\n${error.stack}`);
    }

    return new Error(`${file} from Terser\n${error.message}`);
  }
  /**
   * @private
   * @param {boolean} parallel
   * @returns {number}
   */


  static getAvailableNumberOfCores(parallel) {
    // In some cases cpus() returns undefined
    // https://github.com/nodejs/node/issues/19022
    const cpus = os.cpus() || {
      length: 1
    };
    return parallel === true ? cpus.length - 1 : Math.min(Number(parallel) || 0, cpus.length - 1);
  }
  /**
   * @param {Compiler} compiler
   * @param {Compilation} compilation
   * @param {Record<string, import("webpack").sources.Source>} assets
   * @param {{availableNumberOfCores: number}} optimizeOptions
   * @returns {Promise<void>}
   */


  async optimize(compiler, compilation, assets, optimizeOptions) {
    const cache = compilation.getCache("TerserWebpackPlugin");
    let numberOfAssetsForMinify = 0;
    const assetsForMinify = await Promise.all(Object.keys(assets).filter(name => {
      const {
        info
      } = compilation.getAsset(name);

      if ( // Skip double minimize assets from child compilation
      info.minimized || // Skip minimizing for extracted comments assets
      info.extractedComments) {
        return false;
      }

      if (!compiler.webpack.ModuleFilenameHelpers.matchObject.bind( // eslint-disable-next-line no-undefined
      undefined, this.options)(name)) {
        return false;
      }

      return true;
    }).map(async name => {
      const {
        info,
        source
      } = compilation.getAsset(name);
      const eTag = cache.getLazyHashedEtag(source);
      const cacheItem = cache.getItemCache(name, eTag);
      const output = await cacheItem.getPromise();

      if (!output) {
        numberOfAssetsForMinify += 1;
      }

      return {
        name,
        info,
        inputSource: source,
        output,
        cacheItem
      };
    }));
    /** @type {undefined | (() => MinifyWorker)} */

    let getWorker;
    /** @type {undefined | MinifyWorker} */

    let initializedWorker;
    /** @type {undefined | number} */

    let numberOfWorkers;

    if (optimizeOptions.availableNumberOfCores > 0) {
      // Do not create unnecessary workers when the number of files is less than the available cores, it saves memory
      numberOfWorkers = Math.min(numberOfAssetsForMinify, optimizeOptions.availableNumberOfCores); // eslint-disable-next-line consistent-return

      getWorker = () => {
        if (initializedWorker) {
          return initializedWorker;
        }

        initializedWorker =
        /** @type {MinifyWorker} */
        new _jestWorker.default(require.resolve("./minify"), {
          numWorkers: numberOfWorkers,
          enableWorkerThreads: true
        }); // https://github.com/facebook/jest/issues/8872#issuecomment-524822081

        const workerStdout = initializedWorker.getStdout();

        if (workerStdout) {
          workerStdout.on("data", chunk => process.stdout.write(chunk));
        }

        const workerStderr = initializedWorker.getStderr();

        if (workerStderr) {
          workerStderr.on("data", chunk => process.stderr.write(chunk));
        }

        return initializedWorker;
      };
    }

    const limit = (0, _pLimit.default)(getWorker && numberOfAssetsForMinify > 0 ?
    /** @type {number} */
    numberOfWorkers : Infinity);
    const {
      SourceMapSource,
      ConcatSource,
      RawSource
    } = compiler.webpack.sources;
    const allExtractedComments = new Map();
    const scheduledTasks = [];

    for (const asset of assetsForMinify) {
      scheduledTasks.push(limit(async () => {
        const {
          name,
          inputSource,
          info,
          cacheItem
        } = asset;
        let {
          output
        } = asset;

        if (!output) {
          let input;
          /** @type {RawSourceMap | undefined} */

          let inputSourceMap;
          const {
            source: sourceFromInputSource,
            map
          } = inputSource.sourceAndMap();
          input = sourceFromInputSource;

          if (map) {
            if (TerserPlugin.isSourceMap(map)) {
              inputSourceMap =
              /** @type {RawSourceMap} */
              map;
            } else {
              inputSourceMap =
              /** @type {RawSourceMap} */
              map;
              compilation.warnings.push(
              /** @type {WebpackError} */
              new Error(`${name} contains invalid source map`));
            }
          }

          if (Buffer.isBuffer(input)) {
            input = input.toString();
          }
          /** @type {InternalMinifyOptions} */


          const options = {
            name,
            input,
            inputSourceMap,
            minify: this.options.minify,
            minifyOptions: { ...this.options.terserOptions
            },
            extractComments: this.options.extractComments
          };

          if (typeof options.minifyOptions.module === "undefined") {
            if (typeof info.javascriptModule !== "undefined") {
              options.minifyOptions.module = info.javascriptModule;
            } else if (/\.mjs(\?.*)?$/i.test(name)) {
              options.minifyOptions.module = true;
            } else if (/\.cjs(\?.*)?$/i.test(name)) {
              options.minifyOptions.module = false;
            }
          }

          try {
            output = await (getWorker ? getWorker().transform((0, _serializeJavascript.default)(options)) : (0, _minify.minify)(options));
          } catch (error) {
            const hasSourceMap = inputSourceMap && TerserPlugin.isSourceMap(inputSourceMap);
            compilation.errors.push(TerserPlugin.buildError(error, name, // eslint-disable-next-line no-undefined
            hasSourceMap ? compilation.requestShortener : undefined, hasSourceMap ? new _sourceMap.SourceMapConsumer(
            /** @type {RawSourceMap} */
            inputSourceMap) : // eslint-disable-next-line no-undefined
            undefined));
            return;
          }

          let shebang;

          if (
          /** @type {ExtractCommentsObject} */
          this.options.extractComments.banner !== false && output.extractedComments && output.extractedComments.length > 0 && output.code.startsWith("#!")) {
            const firstNewlinePosition = output.code.indexOf("\n");
            shebang = output.code.substring(0, firstNewlinePosition);
            output.code = output.code.substring(firstNewlinePosition + 1);
          }

          if (output.map) {
            output.source = new SourceMapSource(output.code, name, output.map, input,
            /** @type {RawSourceMap} */
            inputSourceMap, true);
          } else {
            output.source = new RawSource(output.code);
          }

          if (output.extractedComments && output.extractedComments.length > 0) {
            const commentsFilename =
            /** @type {ExtractCommentsObject} */
            this.options.extractComments.filename || "[file].LICENSE.txt[query]";
            let query = "";
            let filename = name;
            const querySplit = filename.indexOf("?");

            if (querySplit >= 0) {
              query = filename.substr(querySplit);
              filename = filename.substr(0, querySplit);
            }

            const lastSlashIndex = filename.lastIndexOf("/");
            const basename = lastSlashIndex === -1 ? filename : filename.substr(lastSlashIndex + 1);
            const data = {
              filename,
              basename,
              query
            };
            output.commentsFilename = compilation.getPath(commentsFilename, data);
            let banner; // Add a banner to the original file

            if (
            /** @type {ExtractCommentsObject} */
            this.options.extractComments.banner !== false) {
              banner =
              /** @type {ExtractCommentsObject} */
              this.options.extractComments.banner || `For license information please see ${path.relative(path.dirname(name), output.commentsFilename).replace(/\\/g, "/")}`;

              if (typeof banner === "function") {
                banner = banner(output.commentsFilename);
              }

              if (banner) {
                output.source = new ConcatSource(shebang ? `${shebang}\n` : "", `/*! ${banner} */\n`, output.source);
              }
            }

            const extractedCommentsString = output.extractedComments.sort().join("\n\n");
            output.extractedCommentsSource = new RawSource(`${extractedCommentsString}\n`);
          }

          await cacheItem.storePromise({
            source: output.source,
            commentsFilename: output.commentsFilename,
            extractedCommentsSource: output.extractedCommentsSource
          });
        }
        /** @type {AssetInfo} */


        const newInfo = {
          minimized: true
        };
        const {
          source,
          extractedCommentsSource
        } = output; // Write extracted comments to commentsFilename

        if (extractedCommentsSource) {
          const {
            commentsFilename
          } = output;
          newInfo.related = {
            license: commentsFilename
          };
          allExtractedComments.set(name, {
            extractedCommentsSource,
            commentsFilename
          });
        }

        compilation.updateAsset(name, source, newInfo);
      }));
    }

    await Promise.all(scheduledTasks);

    if (initializedWorker) {
      await initializedWorker.end();
    }

    await Array.from(allExtractedComments).sort().reduce(
    /**
     * @param {Promise<any>} previousPromise
     * @param {any} extractedComments
     * @returns {Promise<any>}
     */
    async (previousPromise, [from, value]) => {
      const previous = await previousPromise;
      const {
        commentsFilename,
        extractedCommentsSource
      } = value;

      if (previous && previous.commentsFilename === commentsFilename) {
        const {
          from: previousFrom,
          source: prevSource
        } = previous;
        const mergedName = `${previousFrom}|${from}`;
        const name = `${commentsFilename}|${mergedName}`;
        const eTag = [prevSource, extractedCommentsSource].map(item => cache.getLazyHashedEtag(item)).reduce((previousValue, currentValue) => cache.mergeEtags(previousValue, currentValue));
        let source = await cache.getPromise(name, eTag);

        if (!source) {
          source = new ConcatSource(Array.from(new Set([...prevSource.source().split("\n\n"), ...extractedCommentsSource.source().split("\n\n")])).join("\n\n"));
          await cache.storePromise(name, eTag, source);
        }

        compilation.updateAsset(commentsFilename, source);
        return {
          commentsFilename,
          from: mergedName,
          source
        };
      }

      const existingAsset = compilation.getAsset(commentsFilename);

      if (existingAsset) {
        return {
          commentsFilename,
          from: commentsFilename,
          source: existingAsset.source
        };
      }

      compilation.emitAsset(commentsFilename, extractedCommentsSource, {
        extractedComments: true
      });
      return {
        commentsFilename,
        from,
        source: extractedCommentsSource
      };
    }, Promise.resolve());
  }
  /**
   * @private
   * @param {any} environment
   * @returns {TerserECMA}
   */


  static getEcmaVersion(environment) {
    // ES 6th
    if (environment.arrowFunction || environment.const || environment.destructuring || environment.forOf || environment.module) {
      return 2015;
    } // ES 11th


    if (environment.bigIntLiteral || environment.dynamicImport) {
      return 2020;
    }

    return 5;
  }
  /**
   * @param {Compiler} compiler
   * @returns {void}
   */


  apply(compiler) {
    const {
      output
    } = compiler.options;

    if (typeof this.options.terserOptions.ecma === "undefined") {
      this.options.terserOptions.ecma = TerserPlugin.getEcmaVersion(output.environment || {});
    }

    const pluginName = this.constructor.name;
    const availableNumberOfCores = TerserPlugin.getAvailableNumberOfCores(this.options.parallel);
    compiler.hooks.compilation.tap(pluginName, compilation => {
      const hooks = compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation);
      const data = (0, _serializeJavascript.default)({
        terser: terserPackageJson.version,
        terserOptions: this.options.terserOptions
      });
      hooks.chunkHash.tap(pluginName, (chunk, hash) => {
        hash.update("TerserPlugin");
        hash.update(data);
      });
      compilation.hooks.processAssets.tapPromise({
        name: pluginName,
        stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
        additionalAssets: true
      }, assets => this.optimize(compiler, compilation, assets, {
        availableNumberOfCores
      }));
      compilation.hooks.statsPrinter.tap(pluginName, stats => {
        stats.hooks.print.for("asset.info.minimized").tap("terser-webpack-plugin", (minimized, {
          green,
          formatFlag
        }) => // eslint-disable-next-line no-undefined
        minimized ? green(formatFlag("minimized")) : undefined);
      });
    });
  }

}

var _default = TerserPlugin;
exports.default = _default;