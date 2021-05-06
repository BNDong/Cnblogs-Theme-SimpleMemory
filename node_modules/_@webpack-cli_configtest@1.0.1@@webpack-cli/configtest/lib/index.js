"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigTestCommand {
    async apply(cli) {
        const { logger, webpack } = cli;
        await cli.makeCommand({
            name: 'configtest [config-path]',
            alias: 't',
            description: 'Validate a webpack configuration.',
            pkg: '@webpack-cli/configtest',
        }, [], async (configPath) => {
            const config = await cli.resolveConfig(configPath ? { config: [configPath] } : {});
            const configPaths = new Set();
            if (Array.isArray(config.options)) {
                config.options.forEach((options) => {
                    if (config.path.get(options)) {
                        configPaths.add(config.path.get(options));
                    }
                });
            }
            else {
                if (config.path.get(config.options)) {
                    configPaths.add(config.path.get(config.options));
                }
            }
            if (configPaths.size === 0) {
                logger.error('No configuration found.');
                process.exit(2);
            }
            logger.info(`Validate '${Array.from(configPaths).join(' ,')}'.`);
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const error = webpack.validate(config.options);
                // TODO remove this after drop webpack@4
                if (error && error.length > 0) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    throw new webpack.WebpackOptionsValidationError(error);
                }
            }
            catch (error) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const isValidationError = (error) => {
                    // https://github.com/webpack/webpack/blob/master/lib/index.js#L267
                    // https://github.com/webpack/webpack/blob/v4.44.2/lib/webpack.js#L90
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const ValidationError = (webpack.ValidationError || webpack.WebpackOptionsValidationError);
                    return error instanceof ValidationError;
                };
                if (isValidationError(error)) {
                    logger.error(error.message);
                }
                else {
                    logger.error(error);
                }
                process.exit(2);
            }
            logger.success('There are no validation errors in the given webpack configuration.');
        });
    }
}
exports.default = ConfigTestCommand;
