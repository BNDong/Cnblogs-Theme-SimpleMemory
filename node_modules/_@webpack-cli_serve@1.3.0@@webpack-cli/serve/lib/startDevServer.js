"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Starts the devServer
 *
 * @param {Object} compiler - a webpack compiler
 * @param {Object} devServerCliOptions - dev server CLI options
 * @param {Object} cliOptions - CLI options
 * @param {Object} logger - logger
 *
 * @returns {Object[]} array of resulting servers
 */
async function startDevServer(compiler, devServerCliOptions, cliOptions, logger) {
    let devServerVersion, Server, findPort;
    try {
        // eslint-disable-next-line node/no-extraneous-require
        devServerVersion = require('webpack-dev-server/package.json').version;
        // eslint-disable-next-line node/no-extraneous-require
        Server = require('webpack-dev-server/lib/Server');
        // eslint-disable-next-line node/no-extraneous-require
        findPort = require('webpack-dev-server/lib/utils/findPort');
    }
    catch (err) {
        logger.error(`You need to install 'webpack-dev-server' for running 'webpack serve'.\n${err}`);
        process.exit(2);
    }
    const mergeOptions = (devServerOptions, devServerCliOptions) => {
        // CLI options should take precedence over devServer options,
        // and CLI options should have no default values included
        const options = Object.assign(Object.assign({}, devServerOptions), devServerCliOptions);
        if (devServerOptions.client && devServerCliOptions.client) {
            // the user could set some client options in their devServer config,
            // then also specify client options on the CLI
            options.client = Object.assign(Object.assign({}, devServerOptions.client), devServerCliOptions.client);
        }
        return options;
    };
    const isMultiCompiler = Boolean(compiler.compilers);
    let compilersWithDevServerOption;
    if (isMultiCompiler) {
        compilersWithDevServerOption = compiler.compilers.filter((compiler) => compiler.options.devServer);
        // No compilers found with the `devServer` option, let's use first compiler
        if (compilersWithDevServerOption.length === 0) {
            compilersWithDevServerOption = [compiler.compilers[0]];
        }
    }
    else {
        compilersWithDevServerOption = [compiler];
    }
    const isDevServer4 = devServerVersion.startsWith('4');
    const usedPorts = [];
    const devServersOptions = [];
    for (const compilerWithDevServerOption of compilersWithDevServerOption) {
        const options = mergeOptions(compilerWithDevServerOption.options.devServer || {}, devServerCliOptions);
        if (isDevServer4) {
            options.port = await findPort(options.port);
            options.client = options.client || {};
            options.client.port = options.client.port || options.port;
        }
        else {
            const getPublicPathOption = () => {
                const normalizePublicPath = (publicPath) => typeof publicPath === 'undefined' || publicPath === 'auto' ? '/' : publicPath;
                if (cliOptions.outputPublicPath) {
                    return normalizePublicPath(compilerWithDevServerOption.options.output.publicPath);
                }
                // webpack-dev-server@3
                if (options.publicPath) {
                    return normalizePublicPath(options.publicPath);
                }
                // webpack-dev-server@4
                if (options.dev && options.dev.publicPath) {
                    return normalizePublicPath(options.dev.publicPath);
                }
                return normalizePublicPath(compilerWithDevServerOption.options.output.publicPath);
            };
            const getStatsOption = () => {
                if (cliOptions.stats) {
                    return compilerWithDevServerOption.options.stats;
                }
                if (options.stats) {
                    return options.stats;
                }
                return compilerWithDevServerOption.options.stats;
            };
            options.host = options.host || 'localhost';
            options.port = options.port || 8080;
            options.stats = getStatsOption();
            options.publicPath = getPublicPathOption();
        }
        if (options.port) {
            const portNumber = Number(options.port);
            if (usedPorts.find((port) => portNumber === port)) {
                throw new Error('Unique ports must be specified for each devServer option in your webpack configuration. Alternatively, run only 1 devServer config using the --config-name flag to specify your desired config.');
            }
            usedPorts.push(portNumber);
        }
        devServersOptions.push({ compiler, options });
    }
    const servers = [];
    for (const devServerOptions of devServersOptions) {
        const { compiler, options } = devServerOptions;
        const server = new Server(compiler, options);
        server.listen(options.port, options.host, (error) => {
            if (error) {
                throw error;
            }
        });
        servers.push(server);
    }
    return servers;
}
exports.default = startDevServer;
