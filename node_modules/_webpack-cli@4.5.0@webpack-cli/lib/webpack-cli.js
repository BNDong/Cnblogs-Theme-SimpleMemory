const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const Module = require('module');

const { program } = require('commander');
const utils = require('./utils');

class WebpackCLI {
    constructor() {
        // Global
        this.webpack = require('webpack');
        this.logger = utils.logger;
        this.utils = utils;

        // Initialize program
        this.program = program;
        this.program.name('webpack');
        this.program.configureOutput({
            writeErr: this.logger.error,
            outputError: (str, write) => write(`Error: ${this.utils.capitalizeFirstLetter(str.replace(/^error:/, '').trim())}`),
        });
    }

    async makeCommand(commandOptions, options, action) {
        const alreadyLoaded = this.program.commands.find(
            (command) => command.name() === commandOptions.name || command.aliases().includes(commandOptions.alias),
        );

        if (alreadyLoaded) {
            return;
        }

        const command = this.program.command(commandOptions.name, {
            noHelp: commandOptions.noHelp,
            hidden: commandOptions.hidden,
            isDefault: commandOptions.isDefault,
        });

        if (commandOptions.description) {
            command.description(commandOptions.description);
        }

        if (commandOptions.usage) {
            command.usage(commandOptions.usage);
        }

        if (Array.isArray(commandOptions.alias)) {
            command.aliases(commandOptions.alias);
        } else {
            command.alias(commandOptions.alias);
        }

        if (commandOptions.pkg) {
            command.pkg = commandOptions.pkg;
        } else {
            command.pkg = 'webpack-cli';
        }

        const { forHelp } = this.program;

        let allDependenciesInstalled = true;

        if (commandOptions.dependencies && commandOptions.dependencies.length > 0) {
            for (const dependency of commandOptions.dependencies) {
                const { packageExists } = this.utils;
                const isPkgExist = packageExists(dependency);

                if (isPkgExist) {
                    continue;
                } else if (!isPkgExist && forHelp) {
                    allDependenciesInstalled = false;
                    continue;
                }

                const { promptInstallation, colors } = this.utils;

                try {
                    await promptInstallation(dependency, () => {
                        this.logger.error(
                            `For using '${colors.green(commandOptions.name.split(' ')[0])}' command you need to install: '${colors.green(
                                dependency,
                            )}' package`,
                        );
                    });
                } catch (error) {
                    this.logger.error("Action Interrupted, use 'webpack-cli help' to see possible commands.");
                    this.logger.error(error);
                    process.exit(2);
                }
            }
        }

        if (options) {
            if (typeof options === 'function') {
                if (forHelp && !allDependenciesInstalled) {
                    command.description(
                        `${commandOptions.description} To see all available options you need to install ${commandOptions.dependencies
                            .map((dependency) => `'${dependency}'`)
                            .join(',')}.`,
                    );
                    options = [];
                } else {
                    options = options();
                }
            }

            options.forEach((optionForCommand) => {
                this.makeOption(command, optionForCommand);
            });
        }

        command.action(action);

        return command;
    }

    makeOption(command, option) {
        let type = option.type;
        let isMultipleTypes = Array.isArray(type);
        let isOptional = false;

        if (isMultipleTypes) {
            if (type.length === 1) {
                type = type[0];
                isMultipleTypes = false;
            } else {
                isOptional = type.includes(Boolean);
            }
        }

        const isMultiple = option.multiple;
        const isRequired = type !== Boolean && typeof type !== 'undefined';

        let flags = option.alias ? `-${option.alias}, --${option.name}` : `--${option.name}`;

        if (isOptional) {
            // `commander.js` recognizes [value] as an optional placeholder, making this flag work either as a string or a boolean
            flags = `${flags} [value${isMultiple ? '...' : ''}]`;
        } else if (isRequired) {
            // <value> is a required placeholder for any non-Boolean types
            flags = `${flags} <value${isMultiple ? '...' : ''}>`;
        }

        // TODO `describe` used by `webpack-dev-server@3`
        const description = option.description || option.describe || '';
        const defaultValue = option.defaultValue;

        if (type === Boolean) {
            command.option(flags, description, defaultValue);
        } else if (type === Number) {
            let skipDefault = true;

            command.option(
                flags,
                description,
                (value, prev = []) => {
                    if (defaultValue && isMultiple && skipDefault) {
                        prev = [];
                        skipDefault = false;
                    }

                    return isMultiple ? [].concat(prev).concat(Number(value)) : Number(value);
                },
                defaultValue,
            );
        } else if (type === String) {
            let skipDefault = true;

            command.option(
                flags,
                description,
                (value, prev = []) => {
                    if (defaultValue && isMultiple && skipDefault) {
                        prev = [];
                        skipDefault = false;
                    }

                    return isMultiple ? [].concat(prev).concat(value) : value;
                },
                defaultValue,
            );
        } else if (isMultipleTypes) {
            let skipDefault = true;

            command.option(
                flags,
                description,
                (value, prev = []) => {
                    if (defaultValue && isMultiple && skipDefault) {
                        prev = [];
                        skipDefault = false;
                    }

                    if (type.includes(Number)) {
                        const numberValue = Number(value);

                        if (!isNaN(numberValue)) {
                            return isMultiple ? [].concat(prev).concat(numberValue) : numberValue;
                        }
                    }

                    if (type.includes(String)) {
                        return isMultiple ? [].concat(prev).concat(value) : value;
                    }

                    return value;
                },
                defaultValue,
            );
        } else {
            command.option(flags, description, type, defaultValue);
        }

        if (option.negative) {
            // commander requires explicitly adding the negated version of boolean flags
            const negatedFlag = `--no-${option.name}`;

            command.option(negatedFlag, option.negatedDescription ? option.negatedDescription : `Negative '${option.name}' option.`);
        }
    }

    getBuiltInOptions() {
        if (this.builtInOptionsCache) {
            return this.builtInOptionsCache;
        }

        const minimumHelpFlags = [
            'config',
            'config-name',
            'merge',
            'env',
            'mode',
            'watch',
            'watch-options-stdin',
            'stats',
            'devtool',
            'entry',
            'target',
            'progress',
            'json',
            'name',
            'output-path',
        ];

        const builtInFlags = [
            // For configs
            {
                name: 'config',
                alias: 'c',
                type: String,
                multiple: true,
                description: 'Provide path to a webpack configuration file e.g. ./webpack.config.js.',
            },
            {
                name: 'config-name',
                type: String,
                multiple: true,
                description: 'Name of the configuration to use.',
            },
            {
                name: 'merge',
                alias: 'm',
                type: Boolean,
                description: "Merge two or more configurations using 'webpack-merge'.",
            },
            // Complex configs
            {
                name: 'env',
                type: (value, previous = {}) => {
                    // This ensures we're only splitting by the first `=`
                    const [allKeys, val] = value.split(/=(.+)/, 2);
                    const splitKeys = allKeys.split(/\.(?!$)/);

                    let prevRef = previous;

                    splitKeys.forEach((someKey, index) => {
                        if (!prevRef[someKey]) {
                            prevRef[someKey] = {};
                        }

                        if (typeof prevRef[someKey] === 'string') {
                            prevRef[someKey] = {};
                        }

                        if (index === splitKeys.length - 1) {
                            prevRef[someKey] = val || true;
                        }

                        prevRef = prevRef[someKey];
                    });

                    return previous;
                },
                multiple: true,
                description: 'Environment passed to the configuration when it is a function.',
            },
            {
                name: 'node-env',
                type: String,
                multiple: false,
                description: 'Sets process.env.NODE_ENV to the specified value',
            },

            // Adding more plugins
            {
                name: 'hot',
                alias: 'h',
                type: Boolean,
                negative: true,
                description: 'Enables Hot Module Replacement',
                negatedDescription: 'Disables Hot Module Replacement.',
            },
            {
                name: 'analyze',
                type: Boolean,
                multiple: false,
                description: 'It invokes webpack-bundle-analyzer plugin to get bundle information.',
            },
            {
                name: 'progress',
                type: [Boolean, String],
                description: 'Print compilation progress during build.',
            },
            {
                name: 'prefetch',
                type: String,
                description: 'Prefetch this request.',
            },

            // Output options
            {
                name: 'json',
                type: [String, Boolean],
                alias: 'j',
                description: 'Prints result as JSON or store it in a file.',
            },

            // For webpack@4
            {
                name: 'entry',
                type: String,
                multiple: true,
                description: 'The entry point(s) of your application e.g. ./src/main.js.',
            },
            {
                name: 'output-path',
                alias: 'o',
                type: String,
                description: 'Output location of the file generated by webpack e.g. ./dist/.',
            },
            {
                name: 'target',
                alias: 't',
                type: String,
                multiple: this.webpack.cli !== undefined,
                description: 'Sets the build target e.g. node.',
            },
            {
                name: 'devtool',
                type: String,
                negative: true,
                alias: 'd',
                description: 'Determine source maps to use.',
                negatedDescription: 'Do not generate source maps.',
            },
            {
                name: 'mode',
                type: String,
                description: 'Defines the mode to pass to webpack.',
            },
            {
                name: 'name',
                type: String,
                description: 'Name of the configuration. Used when loading multiple configurations.',
            },
            {
                name: 'stats',
                type: [String, Boolean],
                negative: true,
                description: 'It instructs webpack on how to treat the stats e.g. verbose.',
                negatedDescription: 'Disable stats output.',
            },
            {
                name: 'watch',
                type: Boolean,
                negative: true,
                alias: 'w',
                description: 'Watch for files changes.',
                negatedDescription: 'Do not watch for file changes.',
            },
            {
                name: 'watch-options-stdin',
                type: Boolean,
                negative: true,
                description: 'Stop watching when stdin stream has ended.',
                negatedDescription: 'Do not stop watching when stdin stream has ended.',
            },
        ];

        // Extract all the flags being exported from core.
        // A list of cli flags generated by core can be found here https://github.com/webpack/webpack/blob/master/test/__snapshots__/Cli.test.js.snap
        const coreFlags = this.webpack.cli
            ? Object.entries(this.webpack.cli.getArguments()).map(([flag, meta]) => {
                  if (meta.simpleType === 'string') {
                      meta.type = String;
                  } else if (meta.simpleType === 'number') {
                      meta.type = Number;
                  } else {
                      meta.type = Boolean;
                      meta.negative = !flag.endsWith('-reset');
                  }

                  const inBuiltIn = builtInFlags.find((builtInFlag) => builtInFlag.name === flag);

                  if (inBuiltIn) {
                      return { ...meta, name: flag, group: 'core', ...inBuiltIn };
                  }

                  return { ...meta, name: flag, group: 'core' };
              })
            : [];

        const options = []
            .concat(builtInFlags.filter((builtInFlag) => !coreFlags.find((coreFlag) => builtInFlag.name === coreFlag.name)))
            .concat(coreFlags)
            .map((option) => {
                option.help = minimumHelpFlags.includes(option.name) ? 'minimum' : 'verbose';

                return option;
            });

        this.builtInOptionsCache = options;

        return options;
    }

    applyNodeEnv(options) {
        if (typeof options.nodeEnv === 'string') {
            process.env.NODE_ENV = options.nodeEnv;
        }
    }

    async run(args, parseOptions) {
        // Built-in internal commands
        const buildCommandOptions = {
            name: 'build [entries...]',
            alias: ['bundle', 'b'],
            description: 'Run webpack (default command, can be omitted).',
            usage: '[entries...] [options]',
        };
        const watchCommandOptions = {
            name: 'watch [entries...]',
            alias: 'w',
            description: 'Run webpack and watch for files changes.',
            usage: '[entries...] [options]',
        };
        const versionCommandOptions = {
            name: 'version [commands...]',
            alias: 'v',
            description: "Output the version number of 'webpack', 'webpack-cli' and 'webpack-dev-server' and commands.",
        };
        const helpCommandOptions = {
            name: 'help [command] [option]',
            alias: 'h',
            description: 'Display help for commands and options.',
        };
        // Built-in external commands
        const externalBuiltInCommandsInfo = [
            {
                name: 'serve [entries...]',
                alias: 's',
                pkg: '@webpack-cli/serve',
            },
            {
                name: 'info',
                alias: 'i',
                pkg: '@webpack-cli/info',
            },
            {
                name: 'init',
                alias: 'c',
                pkg: '@webpack-cli/init',
            },
            {
                name: 'loader',
                alias: 'l',
                pkg: '@webpack-cli/generators',
            },
            {
                name: 'plugin',
                alias: 'p',
                pkg: '@webpack-cli/generators',
            },
            {
                name: 'migrate',
                alias: 'm',
                pkg: '@webpack-cli/migrate',
            },
            {
                name: 'configtest [config-path]',
                alias: 't',
                pkg: '@webpack-cli/configtest',
            },
        ];

        const knownCommands = [
            buildCommandOptions,
            watchCommandOptions,
            versionCommandOptions,
            helpCommandOptions,
            ...externalBuiltInCommandsInfo,
        ];
        const getCommandName = (name) => name.split(' ')[0];
        const isKnownCommand = (name) =>
            knownCommands.find(
                (command) =>
                    getCommandName(command.name) === name ||
                    (Array.isArray(command.alias) ? command.alias.includes(name) : command.alias === name),
            );
        const isCommand = (input, commandOptions) => {
            const longName = getCommandName(commandOptions.name);

            if (input === longName) {
                return true;
            }

            if (commandOptions.alias) {
                if (Array.isArray(commandOptions.alias)) {
                    return commandOptions.alias.includes(input);
                } else {
                    return commandOptions.alias === input;
                }
            }

            return false;
        };
        const findCommandByName = (name) =>
            this.program.commands.find((command) => name === command.name() || command.alias().includes(name));
        const isOption = (value) => value.startsWith('-');
        const isGlobalOption = (value) =>
            value === '--color' ||
            value === '--no-color' ||
            value === '-v' ||
            value === '--version' ||
            value === '-h' ||
            value === '--help';

        const loadCommandByName = async (commandName, allowToInstall = false) => {
            const isBuildCommandUsed = isCommand(commandName, buildCommandOptions);
            const isWatchCommandUsed = isCommand(commandName, watchCommandOptions);

            if (isBuildCommandUsed || isWatchCommandUsed) {
                const options = this.getBuiltInOptions();

                await this.makeCommand(
                    isBuildCommandUsed ? buildCommandOptions : watchCommandOptions,
                    isWatchCommandUsed ? options.filter((option) => option.name !== 'watch') : options,
                    async (entries, options) => {
                        if (entries.length > 0) {
                            options.entry = [...entries, ...(options.entry || [])];
                        }

                        await this.buildCommand(options, isWatchCommandUsed);
                    },
                );
            } else if (isCommand(commandName, helpCommandOptions)) {
                // Stub for the `help` command
                this.makeCommand(helpCommandOptions, [], () => {});
            } else if (isCommand(commandName, versionCommandOptions)) {
                // Stub for the `help` command
                this.makeCommand(versionCommandOptions, [], () => {});
            } else {
                const builtInExternalCommandInfo = externalBuiltInCommandsInfo.find(
                    (externalBuiltInCommandInfo) =>
                        getCommandName(externalBuiltInCommandInfo.name) === commandName ||
                        (Array.isArray(externalBuiltInCommandInfo.alias)
                            ? externalBuiltInCommandInfo.alias.includes(commandName)
                            : externalBuiltInCommandInfo.alias === commandName),
                );

                let pkg;

                if (builtInExternalCommandInfo) {
                    ({ pkg } = builtInExternalCommandInfo);
                } else {
                    pkg = commandName;
                }

                if (pkg !== 'webpack-cli' && !this.utils.packageExists(pkg)) {
                    if (!allowToInstall) {
                        return;
                    }

                    const { promptInstallation, colors } = this.utils;

                    try {
                        pkg = await promptInstallation(pkg, () => {
                            this.logger.error(`For using this command you need to install: '${colors.green(pkg)}' package`);
                        });
                    } catch (error) {
                        this.logger.error(`Action Interrupted, use '${colors.cyan('webpack-cli help')}' to see possible commands`);
                        process.exit(2);
                    }
                }

                let loadedCommand;

                try {
                    loadedCommand = require(pkg);
                } catch (error) {
                    // Ignore, command is not installed

                    return;
                }

                if (loadedCommand.default) {
                    loadedCommand = loadedCommand.default;
                }

                let command;

                try {
                    command = new loadedCommand();

                    await command.apply(this);
                } catch (error) {
                    this.logger.error(`Unable to load '${pkg}' command`);
                    this.logger.error(error);
                    process.exit(2);
                }
            }
        };

        // Register own exit
        this.program.exitOverride(async (error) => {
            if (error.exitCode === 0) {
                process.exit(0);
            }

            if (error.code === 'executeSubCommandAsync') {
                process.exit(2);
            }

            if (error.code === 'commander.help') {
                process.exit(0);
            }

            if (error.code === 'commander.unknownOption') {
                let name = error.message.match(/'(.+)'/);

                if (name) {
                    name = name[1].substr(2);

                    if (name.includes('=')) {
                        name = name.split('=')[0];
                    }

                    const { operands } = this.program.parseOptions(this.program.args);
                    const operand = typeof operands[0] !== 'undefined' ? operands[0] : getCommandName(buildCommandOptions.name);

                    if (operand) {
                        const command = findCommandByName(operand);

                        if (!command) {
                            this.logger.error(`Can't find and load command '${operand}'`);
                            this.logger.error("Run 'webpack --help' to see available commands and options");
                            process.exit(2);
                        }

                        command.options.forEach((option) => {
                            if (this.utils.levenshtein.distance(name, option.long.slice(2)) < 3) {
                                this.logger.error(`Did you mean '--${option.name()}'?`);
                            }
                        });
                    }
                }
            }

            // Codes:
            // - commander.unknownCommand
            // - commander.missingArgument
            // - commander.missingMandatoryOptionValue
            // - commander.optionMissingArgument

            this.logger.error("Run 'webpack --help' to see available commands and options");
            process.exit(2);
        });

        // Default `--color` and `--no-color` options
        const cli = this;
        this.program.option('--color', 'Enable colors on console.');
        this.program.on('option:color', function () {
            const { color } = this.opts();

            cli.utils.colors.options.changed = true;
            cli.utils.colors.options.enabled = color;
        });
        this.program.option('--no-color', 'Disable colors on console.');
        this.program.on('option:no-color', function () {
            const { color } = this.opts();

            cli.utils.colors.options.changed = true;
            cli.utils.colors.options.enabled = color;
        });

        // Make `-v, --version` options
        // Make `version|v [commands...]` command
        const outputVersion = async (options) => {
            // Filter `bundle`, `watch`, `version` and `help` commands
            const possibleCommandNames = options.filter(
                (option) =>
                    !isCommand(option, buildCommandOptions) &&
                    !isCommand(option, watchCommandOptions) &&
                    !isCommand(option, versionCommandOptions) &&
                    !isCommand(option, helpCommandOptions),
            );

            possibleCommandNames.forEach((possibleCommandName) => {
                if (!isOption(possibleCommandName)) {
                    return;
                }

                this.logger.error(`Unknown option '${possibleCommandName}'`);
                this.logger.error("Run 'webpack --help' to see available commands and options");
                process.exit(2);
            });

            if (possibleCommandNames.length > 0) {
                await Promise.all(possibleCommandNames.map((possibleCommand) => loadCommandByName(possibleCommand)));

                for (const possibleCommandName of possibleCommandNames) {
                    const foundCommand = findCommandByName(possibleCommandName);

                    if (!foundCommand) {
                        this.logger.error(`Unknown command '${possibleCommandName}'`);
                        this.logger.error("Run 'webpack --help' to see available commands and options");
                        process.exit(2);
                    }

                    try {
                        const { name, version } = require(`${foundCommand.pkg}/package.json`);

                        this.logger.raw(`${name} ${version}`);
                    } catch (e) {
                        this.logger.error(`Error: External package '${foundCommand.pkg}' not found`);
                        process.exit(2);
                    }
                }
            }

            const pkgJSON = require('../package.json');

            this.logger.raw(`webpack ${this.webpack.version}`);
            this.logger.raw(`webpack-cli ${pkgJSON.version}`);

            if (this.utils.packageExists('webpack-dev-server')) {
                // eslint-disable-next-line
                const { version } = require('webpack-dev-server/package.json');

                this.logger.raw(`webpack-dev-server ${version}`);
            }

            process.exit(0);
        };
        this.program.option(
            '-v, --version',
            "Output the version number of 'webpack', 'webpack-cli' and 'webpack-dev-server' and commands.",
        );

        const outputHelp = async (options, isVerbose, isHelpCommandSyntax, program) => {
            const { bold } = this.utils.colors;

            const outputIncorrectUsageOfHelp = () => {
                this.logger.error('Incorrect use of help');
                this.logger.error("Please use: 'webpack help [command] [option]' | 'webpack [command] --help'");
                this.logger.error("Run 'webpack --help' to see available commands and options");
                process.exit(2);
            };

            const isGlobalHelp = options.length === 0;
            const isCommandHelp = options.length === 1 && !isOption(options[0]);

            if (isGlobalHelp || isCommandHelp) {
                const cliAPI = this;

                program.configureHelp({
                    sortSubcommands: true,
                    // Support multiple aliases
                    commandUsage: (command) => {
                        let parentCmdNames = '';

                        for (let parentCmd = command.parent; parentCmd; parentCmd = parentCmd.parent) {
                            parentCmdNames = `${parentCmd.name()} ${parentCmdNames}`;
                        }

                        if (isGlobalHelp) {
                            return `${parentCmdNames}${command.usage()}\n${this.utils.colors.bold(
                                'Alternative usage to run commands:',
                            )} ${parentCmdNames}[command] [options]`;
                        }

                        return `${parentCmdNames}${command.name()}|${command.aliases().join('|')} ${command.usage()}`;
                    },
                    // Support multiple aliases
                    subcommandTerm: (command) => {
                        const humanReadableArgumentName = (argument) => {
                            const nameOutput = argument.name + (argument.variadic === true ? '...' : '');

                            return argument.required ? '<' + nameOutput + '>' : '[' + nameOutput + ']';
                        };
                        const args = command._args.map((arg) => humanReadableArgumentName(arg)).join(' ');

                        return `${command.name()}|${command.aliases().join('|')}${args ? ` ${args}` : ''}${
                            command.options.length > 0 ? ' [options]' : ''
                        }`;
                    },
                    visibleOptions: function visibleOptions(command) {
                        const options = cliAPI.getBuiltInOptions();

                        return command.options.filter((option) => {
                            if (option.hidden) {
                                return false;
                            }

                            if (!isVerbose) {
                                const foundOption = options.find((flag) => {
                                    if (option.negate && flag.negative) {
                                        return `no-${flag.name}` === option.name();
                                    }

                                    return flag.name === option.name();
                                });

                                if (foundOption) {
                                    return foundOption.help === 'minimum';
                                }

                                return true;
                            }

                            return true;
                        });
                    },
                    padWidth(command, helper) {
                        return Math.max(
                            helper.longestArgumentTermLength(command, helper),
                            helper.longestOptionTermLength(command, helper),
                            // For global options
                            helper.longestOptionTermLength(program, helper),
                            helper.longestSubcommandTermLength(isGlobalHelp ? program : command, helper),
                        );
                    },
                    formatHelp: (command, helper) => {
                        const termWidth = helper.padWidth(command, helper);
                        const helpWidth = helper.helpWidth || 80;
                        const itemIndentWidth = 2;
                        const itemSeparatorWidth = 2; // between term and description

                        const formatItem = (term, description) => {
                            if (description) {
                                const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;

                                return helper.wrap(fullText, helpWidth - itemIndentWidth, termWidth + itemSeparatorWidth);
                            }

                            return term;
                        };

                        const formatList = (textArray) => textArray.join('\n').replace(/^/gm, ' '.repeat(itemIndentWidth));

                        // Usage
                        let output = [`${bold('Usage:')} ${helper.commandUsage(command)}`, ''];

                        // Description
                        const commandDescription = isGlobalHelp
                            ? 'The build tool for modern web applications.'
                            : helper.commandDescription(command);

                        if (commandDescription.length > 0) {
                            output = output.concat([commandDescription, '']);
                        }

                        // Arguments
                        const argumentList = helper
                            .visibleArguments(command)
                            .map((argument) => formatItem(argument.term, argument.description));

                        if (argumentList.length > 0) {
                            output = output.concat([bold('Arguments:'), formatList(argumentList), '']);
                        }

                        // Options
                        const optionList = helper
                            .visibleOptions(command)
                            .map((option) => formatItem(helper.optionTerm(option), helper.optionDescription(option)));

                        if (optionList.length > 0) {
                            output = output.concat([bold('Options:'), formatList(optionList), '']);
                        }

                        // Global options
                        const globalOptionList = program.options.map((option) =>
                            formatItem(helper.optionTerm(option), helper.optionDescription(option)),
                        );

                        if (globalOptionList.length > 0) {
                            output = output.concat([bold('Global options:'), formatList(globalOptionList), '']);
                        }

                        // Commands
                        const commandList = helper
                            .visibleCommands(isGlobalHelp ? program : command)
                            .map((command) => formatItem(helper.subcommandTerm(command), helper.subcommandDescription(command)));

                        if (commandList.length > 0) {
                            output = output.concat([bold('Commands:'), formatList(commandList), '']);
                        }

                        return output.join('\n');
                    },
                });

                if (isGlobalHelp) {
                    await Promise.all(
                        knownCommands.map((knownCommand) => {
                            return loadCommandByName(getCommandName(knownCommand.name));
                        }),
                    );

                    const buildCommand = findCommandByName(getCommandName(buildCommandOptions.name));

                    this.logger.raw(buildCommand.helpInformation());
                } else {
                    const name = options[0];

                    await loadCommandByName(name);

                    const command = findCommandByName(name);

                    if (!command) {
                        this.logger.error(`Can't find and load command '${name}'`);
                        this.logger.error("Run 'webpack --help' to see available commands and options");
                        process.exit(2);
                    }

                    this.logger.raw(command.helpInformation());
                }
            } else if (isHelpCommandSyntax) {
                let isCommandSpecified = false;
                let commandName = getCommandName(buildCommandOptions.name);
                let optionName;

                if (options.length === 1) {
                    optionName = options[0];
                } else if (options.length === 2) {
                    isCommandSpecified = true;
                    commandName = options[0];
                    optionName = options[1];

                    if (isOption(commandName)) {
                        outputIncorrectUsageOfHelp();
                    }
                } else {
                    outputIncorrectUsageOfHelp();
                }

                await loadCommandByName(commandName);

                const command = isGlobalOption(optionName) ? program : findCommandByName(commandName);

                if (!command) {
                    this.logger.error(`Can't find and load command '${commandName}'`);
                    this.logger.error("Run 'webpack --help' to see available commands and options");
                    process.exit(2);
                }

                const option = command.options.find((option) => option.short === optionName || option.long === optionName);

                if (!option) {
                    this.logger.error(`Unknown option '${optionName}'`);
                    this.logger.error("Run 'webpack --help' to see available commands and options");
                    process.exit(2);
                }

                const nameOutput =
                    option.flags.replace(/^.+[[<]/, '').replace(/(\.\.\.)?[\]>].*$/, '') + (option.variadic === true ? '...' : '');
                const value = option.required ? '<' + nameOutput + '>' : option.optional ? '[' + nameOutput + ']' : '';

                this.logger.raw(
                    `${bold('Usage')}: webpack${isCommandSpecified ? ` ${commandName}` : ''} ${option.long}${value ? ` ${value}` : ''}`,
                );

                if (option.short) {
                    this.logger.raw(
                        `${bold('Short:')} webpack${isCommandSpecified ? ` ${commandName}` : ''} ${option.short}${
                            value ? ` ${value}` : ''
                        }`,
                    );
                }

                if (option.description) {
                    this.logger.raw(`${bold('Description:')} ${option.description}`);
                }

                if (!option.negate && options.defaultValue) {
                    this.logger.raw(`${bold('Default value:')} ${JSON.stringify(option.defaultValue)}`);
                }

                this.logger.raw('');

                // TODO implement this after refactor cli arguments
                // logger.raw('Possible values: foo | bar');
                // logger.raw('Documentation: https://webpack.js.org/option/name/');
            } else {
                outputIncorrectUsageOfHelp();
            }

            this.logger.raw("To see list of all supported commands and options run 'webpack --help=verbose'.\n");
            this.logger.raw(`${bold('Webpack documentation:')} https://webpack.js.org/.`);
            this.logger.raw(`${bold('CLI documentation:')} https://webpack.js.org/api/cli/.`);
            this.logger.raw(`${bold('Made with ♥ by the webpack team')}.`);
            process.exit(0);
        };
        this.program.helpOption(false);
        this.program.addHelpCommand(false);
        this.program.option('-h, --help [verbose]', 'Display help for commands and options.');

        let isInternalActionCalled = false;

        // Default action
        this.program.usage('[options]');
        this.program.allowUnknownOption(true);
        this.program.action(async (options, program) => {
            if (!isInternalActionCalled) {
                isInternalActionCalled = true;
            } else {
                this.logger.error('No commands found to run');
                process.exit(2);
            }

            // Command and options
            const { operands, unknown } = this.program.parseOptions(program.args);
            const defaultCommandToRun = getCommandName(buildCommandOptions.name);
            const hasOperand = typeof operands[0] !== 'undefined';
            const operand = hasOperand ? operands[0] : defaultCommandToRun;

            const isHelpCommandSyntax = isCommand(operand, helpCommandOptions);

            if (options.help || isHelpCommandSyntax) {
                let isVerbose = false;

                if (options.help) {
                    if (typeof options.help === 'string') {
                        if (options.help !== 'verbose') {
                            this.logger.error("Unknown value for '--help' option, please use '--help=verbose'");
                            process.exit(2);
                        }

                        isVerbose = true;
                    }
                }

                this.program.forHelp = true;

                const optionsForHelp = []
                    .concat(options.help && hasOperand ? [operand] : [])
                    // Syntax `webpack help [command]`
                    .concat(operands.slice(1))
                    // Syntax `webpack help [option]`
                    .concat(unknown)
                    .concat(isHelpCommandSyntax && typeof options.color !== 'undefined' ? [options.color ? '--color' : '--no-color'] : [])
                    .concat(isHelpCommandSyntax && typeof options.version !== 'undefined' ? ['--version'] : []);

                await outputHelp(optionsForHelp, isVerbose, isHelpCommandSyntax, program);
            }

            if (options.version || isCommand(operand, versionCommandOptions)) {
                const optionsForVersion = []
                    .concat(options.version ? [operand] : [])
                    .concat(operands.slice(1))
                    .concat(unknown);

                await outputVersion(optionsForVersion, program);
            }

            let commandToRun = operand;
            let commandOperands = operands.slice(1);

            if (isKnownCommand(commandToRun)) {
                await loadCommandByName(commandToRun, true);
            } else {
                let isEntrySyntax = fs.existsSync(operand);

                if (isEntrySyntax) {
                    commandToRun = defaultCommandToRun;
                    commandOperands = operands;

                    await loadCommandByName(commandToRun);
                } else {
                    this.logger.error(`Unknown command or entry '${operand}'`);

                    const found = knownCommands.find(
                        (commandOptions) => this.utils.levenshtein.distance(operand, getCommandName(commandOptions.name)) < 3,
                    );

                    if (found) {
                        this.logger.error(
                            `Did you mean '${getCommandName(found.name)}' (alias '${
                                Array.isArray(found.alias) ? found.alias.join(', ') : found.alias
                            }')?`,
                        );
                    }

                    this.logger.error("Run 'webpack --help' to see available commands and options");
                    process.exit(2);
                }
            }

            await this.program.parseAsync([commandToRun, ...commandOperands, ...unknown], { from: 'user' });
        });

        await this.program.parseAsync(args, parseOptions);
    }

    async resolveConfig(options) {
        const loadConfig = async (configPath) => {
            const { interpret } = this.utils;
            const ext = path.extname(configPath);
            const interpreted = Object.keys(interpret.jsVariants).find((variant) => variant === ext);

            if (interpreted) {
                const { rechoir } = this.utils;

                try {
                    rechoir.prepare(interpret.extensions, configPath);
                } catch (error) {
                    if (error.failures) {
                        this.logger.error(`Unable load '${configPath}'`);
                        this.logger.error(error.message);

                        error.failures.forEach((failure) => {
                            this.logger.error(failure.error.message);
                        });
                        this.logger.error('Please install one of them');
                        process.exit(2);
                    }

                    this.logger.error(error);
                    process.exit(2);
                }
            }

            let options;

            try {
                try {
                    options = require(configPath);
                } catch (error) {
                    let previousModuleCompile;

                    // TODO Workaround https://github.com/zertosh/v8-compile-cache/issues/30
                    if (this._originalModuleCompile) {
                        previousModuleCompile = Module.prototype._compile;

                        Module.prototype._compile = this._originalModuleCompile;
                    }

                    const dynamicImportLoader = this.utils.dynamicImportLoader();

                    if (this._originalModuleCompile) {
                        Module.prototype._compile = previousModuleCompile;
                    }

                    if (
                        (error.code === 'ERR_REQUIRE_ESM' || process.env.WEBPACK_CLI_FORCE_LOAD_ESM_CONFIG) &&
                        pathToFileURL &&
                        dynamicImportLoader
                    ) {
                        const urlForConfig = pathToFileURL(configPath);

                        options = await dynamicImportLoader(urlForConfig);
                        options = options.default;

                        return { options, path: configPath };
                    }

                    throw error;
                }
            } catch (error) {
                this.logger.error(`Failed to load '${configPath}' config`);

                if (this.isValidationError(error)) {
                    this.logger.error(error.message);
                } else {
                    this.logger.error(error);
                }

                process.exit(2);
            }

            if (options.default) {
                options = options.default;
            }

            return { options, path: configPath };
        };

        const evaluateConfig = async (loadedConfig, argv) => {
            const isMultiCompiler = Array.isArray(loadedConfig.options);
            const config = isMultiCompiler ? loadedConfig.options : [loadedConfig.options];

            let evaluatedConfig = await Promise.all(
                config.map(async (rawConfig) => {
                    if (typeof rawConfig.then === 'function') {
                        rawConfig = await rawConfig;
                    }

                    // `Promise` may return `Function`
                    if (typeof rawConfig === 'function') {
                        // when config is a function, pass the env from args to the config function
                        rawConfig = await rawConfig(argv.env, argv);
                    }

                    return rawConfig;
                }),
            );

            loadedConfig.options = isMultiCompiler ? evaluatedConfig : evaluatedConfig[0];

            const isObject = (value) => typeof value === 'object' && value !== null;

            if (!isObject(loadedConfig.options) && !Array.isArray(loadedConfig.options)) {
                this.logger.error(`Invalid configuration in '${loadedConfig.path}'`);
                process.exit(2);
            }

            return loadedConfig;
        };

        let config = { options: {}, path: new WeakMap() };

        if (options.config && options.config.length > 0) {
            const evaluatedConfigs = await Promise.all(
                options.config.map(async (value) => evaluateConfig(await loadConfig(path.resolve(value)), options.argv || {})),
            );

            config.options = [];

            evaluatedConfigs.forEach((evaluatedConfig) => {
                if (Array.isArray(evaluatedConfig.options)) {
                    evaluatedConfig.options.forEach((options) => {
                        config.options.push(options);
                        config.path.set(options, evaluatedConfig.path);
                    });
                } else {
                    config.options.push(evaluatedConfig.options);
                    config.path.set(evaluatedConfig.options, evaluatedConfig.path);
                }
            });

            config.options = config.options.length === 1 ? config.options[0] : config.options;
        } else {
            const { interpret } = this.utils;

            // Order defines the priority, in increasing order
            const defaultConfigFiles = ['webpack.config', '.webpack/webpack.config', '.webpack/webpackfile']
                .map((filename) =>
                    // Since .cjs is not available on interpret side add it manually to default config extension list
                    [...Object.keys(interpret.extensions), '.cjs'].map((ext) => ({
                        path: path.resolve(filename + ext),
                        ext: ext,
                        module: interpret.extensions[ext],
                    })),
                )
                .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

            let foundDefaultConfigFile;

            for (const defaultConfigFile of defaultConfigFiles) {
                if (!fs.existsSync(defaultConfigFile.path)) {
                    continue;
                }

                foundDefaultConfigFile = defaultConfigFile;
                break;
            }

            if (foundDefaultConfigFile) {
                const loadedConfig = await loadConfig(foundDefaultConfigFile.path);
                const evaluatedConfig = await evaluateConfig(loadedConfig, options.argv || {});

                config.options = evaluatedConfig.options;

                if (Array.isArray(config.options)) {
                    config.options.forEach((options) => {
                        config.path.set(options, evaluatedConfig.path);
                    });
                } else {
                    config.path.set(evaluatedConfig.options, evaluatedConfig.path);
                }
            }
        }

        if (options.configName) {
            const notfoundConfigNames = [];

            config.options = options.configName.map((configName) => {
                let found;

                if (Array.isArray(config.options)) {
                    found = config.options.find((options) => options.name === configName);
                } else {
                    found = config.options.name === configName ? config.options : undefined;
                }

                if (!found) {
                    notfoundConfigNames.push(configName);
                }

                return found;
            });

            if (notfoundConfigNames.length > 0) {
                this.logger.error(
                    notfoundConfigNames.map((configName) => `Configuration with the name "${configName}" was not found.`).join(' '),
                );
                process.exit(2);
            }
        }

        if (options.merge) {
            const { merge } = require('webpack-merge');

            // we can only merge when there are multiple configurations
            // either by passing multiple configs by flags or passing a
            // single config exporting an array
            if (!Array.isArray(config.options) || config.options.length <= 1) {
                this.logger.error('At least two configurations are required for merge.');
                process.exit(2);
            }

            const mergedConfigPaths = [];

            config.options = config.options.reduce((accumulator, options) => {
                const configPath = config.path.get(options);
                const mergedOptions = merge(accumulator, options);

                mergedConfigPaths.push(configPath);

                return mergedOptions;
            }, {});
            config.path.set(config.options, mergedConfigPaths);
        }

        return config;
    }

    // TODO refactor
    async applyOptions(config, options) {
        if (options.analyze) {
            if (!this.utils.packageExists('webpack-bundle-analyzer')) {
                const { promptInstallation, colors } = this.utils;

                try {
                    await promptInstallation('webpack-bundle-analyzer', () => {
                        this.logger.error(`It looks like ${colors.yellow('webpack-bundle-analyzer')} is not installed.`);
                    });
                } catch (error) {
                    this.logger.error(
                        `Action Interrupted, Please try once again or install ${colors.yellow('webpack-bundle-analyzer')} manually.`,
                    );
                    process.exit(2);
                }

                this.logger.success(`${colors.yellow('webpack-bundle-analyzer')} was installed successfully.`);
            }
        }

        if (typeof options.progress === 'string' && options.progress !== 'profile') {
            this.logger.error(`'${options.progress}' is an invalid value for the --progress option. Only 'profile' is allowed.`);
            process.exit(2);
        }

        const outputHints = (configOptions) => {
            if (
                configOptions.watch &&
                options.argv &&
                options.argv.env &&
                (options.argv.env['WEBPACK_WATCH'] || options.argv.env['WEBPACK_SERVE'])
            ) {
                this.logger.warn(
                    `No need to use the '${
                        options.argv.env['WEBPACK_WATCH'] ? 'watch' : 'serve'
                    }' command together with '{ watch: true }' configuration, it does not make sense.`,
                );

                if (options.argv.env['WEBPACK_SERVE']) {
                    configOptions.watch = false;
                }
            }

            return configOptions;
        };

        config.options = Array.isArray(config.options)
            ? config.options.map((options) => outputHints(options))
            : outputHints(config.options);

        if (this.webpack.cli) {
            const processArguments = (configOptions) => {
                const args = this.getBuiltInOptions()
                    .filter((flag) => flag.group === 'core')
                    .reduce((accumulator, flag) => {
                        accumulator[flag.name] = flag;

                        return accumulator;
                    }, {});

                const values = Object.keys(options).reduce((accumulator, name) => {
                    if (name === 'argv') {
                        return accumulator;
                    }

                    const kebabName = this.utils.toKebabCase(name);

                    if (args[kebabName]) {
                        accumulator[kebabName] = options[name];
                    }

                    return accumulator;
                }, {});

                const problems = this.webpack.cli.processArguments(args, configOptions, values);

                if (problems) {
                    const groupBy = (xs, key) => {
                        return xs.reduce((rv, x) => {
                            (rv[x[key]] = rv[x[key]] || []).push(x);

                            return rv;
                        }, {});
                    };
                    const problemsByPath = groupBy(problems, 'path');

                    for (const path in problemsByPath) {
                        const problems = problemsByPath[path];

                        problems.forEach((problem) => {
                            this.logger.error(
                                `${this.utils.capitalizeFirstLetter(problem.type.replace(/-/g, ' '))}${
                                    problem.value ? ` '${problem.value}'` : ''
                                } for the '--${problem.argument}' option${problem.index ? ` by index '${problem.index}'` : ''}`,
                            );

                            if (problem.expected) {
                                this.logger.error(`Expected: '${problem.expected}'`);
                            }
                        });
                    }

                    process.exit(2);
                }

                return configOptions;
            };

            config.options = Array.isArray(config.options)
                ? config.options.map((options) => processArguments(options))
                : processArguments(config.options);

            const setupDefaultOptions = (configOptions) => {
                // No need to run for webpack@4
                if (configOptions.cache && configOptions.cache.type === 'filesystem') {
                    const configPath = config.path.get(configOptions);

                    if (configPath) {
                        if (!configOptions.cache.buildDependencies) {
                            configOptions.cache.buildDependencies = {};
                        }

                        if (!configOptions.cache.buildDependencies.defaultConfig) {
                            configOptions.cache.buildDependencies.defaultConfig = [];
                        }

                        if (Array.isArray(configPath)) {
                            configPath.forEach((item) => {
                                configOptions.cache.buildDependencies.defaultConfig.push(item);
                            });
                        } else {
                            configOptions.cache.buildDependencies.defaultConfig.push(configPath);
                        }
                    }
                }

                return configOptions;
            };

            config.options = Array.isArray(config.options)
                ? config.options.map((options) => setupDefaultOptions(options))
                : setupDefaultOptions(config.options);
        }

        // Logic for webpack@4
        // TODO remove after drop webpack@4
        const processLegacyArguments = (configOptions) => {
            if (options.entry) {
                configOptions.entry = options.entry;
            }

            if (options.outputPath) {
                configOptions.output = {
                    ...configOptions.output,
                    ...{ path: path.resolve(options.outputPath) },
                };
            }

            if (options.target) {
                configOptions.target = options.target;
            }

            if (typeof options.devtool !== 'undefined') {
                configOptions.devtool = options.devtool;
            }

            if (options.mode) {
                configOptions.mode = options.mode;
            } else if (
                !configOptions.mode &&
                process.env &&
                process.env.NODE_ENV &&
                (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'none')
            ) {
                configOptions.mode = process.env.NODE_ENV;
            }

            if (options.name) {
                configOptions.name = options.name;
            }

            if (typeof options.stats !== 'undefined') {
                configOptions.stats = options.stats;
            }

            if (typeof options.watch !== 'undefined') {
                configOptions.watch = options.watch;
            }

            if (typeof options.watchOptionsStdin !== 'undefined') {
                configOptions.watchOptions = {
                    ...configOptions.watchOptions,
                    ...{ stdin: options.watchOptionsStdin },
                };
            }

            return configOptions;
        };

        config.options = Array.isArray(config.options)
            ? config.options.map((options) => processLegacyArguments(options))
            : processLegacyArguments(config.options);

        // Apply `stats` and `stats.colors` options
        const applyStatsColors = (configOptions) => {
            // TODO remove after drop webpack@4
            const statsForWebpack4 = this.webpack.Stats && this.webpack.Stats.presetToOptions;

            if (statsForWebpack4) {
                if (typeof configOptions.stats === 'undefined') {
                    configOptions.stats = {};
                } else if (typeof configOptions.stats === 'boolean' || typeof configOptions.stats === 'string') {
                    if (
                        typeof configOptions.stats === 'string' &&
                        configOptions.stats !== 'none' &&
                        configOptions.stats !== 'verbose' &&
                        configOptions.stats !== 'detailed' &&
                        configOptions.stats !== 'minimal' &&
                        configOptions.stats !== 'errors-only' &&
                        configOptions.stats !== 'errors-warnings'
                    ) {
                        return configOptions;
                    }

                    configOptions.stats = this.webpack.Stats.presetToOptions(configOptions.stats);
                }
            } else {
                if (typeof configOptions.stats === 'undefined') {
                    configOptions.stats = { preset: 'normal' };
                } else if (typeof configOptions.stats === 'boolean') {
                    configOptions.stats = configOptions.stats ? { preset: 'normal' } : { preset: 'none' };
                } else if (typeof configOptions.stats === 'string') {
                    configOptions.stats = { preset: configOptions.stats };
                }
            }

            let colors;

            // From arguments
            if (typeof this.utils.colors.options.changed !== 'undefined') {
                colors = Boolean(this.utils.colors.options.enabled);
            }
            // From stats
            else if (typeof configOptions.stats.colors !== 'undefined') {
                colors = configOptions.stats.colors;
            }
            // Default
            else {
                colors = Boolean(this.utils.colors.options.enabled);
            }

            configOptions.stats.colors = colors;

            return configOptions;
        };

        config.options = Array.isArray(config.options)
            ? config.options.map((options) => applyStatsColors(options))
            : applyStatsColors(config.options);

        return config;
    }

    async applyCLIPlugin(config, cliOptions) {
        const addCLIPlugin = (configOptions) => {
            if (!configOptions.plugins) {
                configOptions.plugins = [];
            }

            const CLIPlugin = require('./plugins/CLIPlugin');

            configOptions.plugins.unshift(
                new CLIPlugin({
                    configPath: config.path,
                    helpfulOutput: !cliOptions.json,
                    hot: cliOptions.hot,
                    progress: cliOptions.progress,
                    prefetch: cliOptions.prefetch,
                    analyze: cliOptions.analyze,
                }),
            );

            return configOptions;
        };
        config.options = Array.isArray(config.options)
            ? config.options.map((options) => addCLIPlugin(options))
            : addCLIPlugin(config.options);

        return config;
    }

    needWatchStdin(compiler) {
        if (compiler.compilers) {
            return compiler.compilers.some((compiler) => compiler.options.watchOptions && compiler.options.watchOptions.stdin);
        }

        return compiler.options.watchOptions && compiler.options.watchOptions.stdin;
    }

    isValidationError(error) {
        // https://github.com/webpack/webpack/blob/master/lib/index.js#L267
        // https://github.com/webpack/webpack/blob/v4.44.2/lib/webpack.js#L90
        const ValidationError = this.webpack.ValidationError || this.webpack.WebpackOptionsValidationError;

        return error instanceof ValidationError || error.name === 'ValidationError';
    }

    async createCompiler(options, callback) {
        this.applyNodeEnv(options);

        let config = await this.resolveConfig(options);

        config = await this.applyOptions(config, options);
        config = await this.applyCLIPlugin(config, options);

        let compiler;

        try {
            compiler = this.webpack(
                config.options,
                callback
                    ? (error, stats) => {
                          if (error && this.isValidationError(error)) {
                              this.logger.error(error.message);
                              process.exit(2);
                          }

                          callback(error, stats);
                      }
                    : callback,
            );
        } catch (error) {
            if (this.isValidationError(error)) {
                this.logger.error(error.message);
            } else {
                this.logger.error(error);
            }

            process.exit(2);
        }

        // TODO webpack@4 return Watching and MultiWatching instead Compiler and MultiCompiler, remove this after drop webpack@4
        if (compiler && compiler.compiler) {
            compiler = compiler.compiler;
        }

        return compiler;
    }

    async buildCommand(options, isWatchCommand) {
        let compiler;

        const callback = (error, stats) => {
            if (error) {
                this.logger.error(error);
                process.exit(2);
            }

            if (stats.hasErrors()) {
                process.exitCode = 1;
            }

            if (!compiler) {
                return;
            }

            const statsOptions = compiler.compilers
                ? { children: compiler.compilers.map((compiler) => (compiler.options ? compiler.options.stats : undefined)) }
                : compiler.options
                ? compiler.options.stats
                : undefined;

            // TODO webpack@4 doesn't support `{ children: [{ colors: true }, { colors: true }] }` for stats
            const statsForWebpack4 = this.webpack.Stats && this.webpack.Stats.presetToOptions;

            if (compiler.compilers && statsForWebpack4) {
                statsOptions.colors = statsOptions.children.some((child) => child.colors);
            }

            if (options.json) {
                const { stringifyStream: createJsonStringifyStream } = require('@discoveryjs/json-ext');
                const handleWriteError = (error) => {
                    this.logger.error(error);
                    process.exit(2);
                };

                if (options.json === true) {
                    createJsonStringifyStream(stats.toJson(statsOptions))
                        .on('error', handleWriteError)
                        .pipe(process.stdout)
                        .on('error', handleWriteError)
                        .on('close', () => process.stdout.write('\n'));
                } else {
                    createJsonStringifyStream(stats.toJson(statsOptions))
                        .on('error', handleWriteError)
                        .pipe(fs.createWriteStream(options.json))
                        .on('error', handleWriteError)
                        // Use stderr to logging
                        .on('close', () =>
                            process.stderr.write(
                                `[webpack-cli] ${this.utils.colors.green(`stats are successfully stored as json to ${options.json}`)}\n`,
                            ),
                        );
                }
            } else {
                const printedStats = stats.toString(statsOptions);

                // Avoid extra empty line when `stats: 'none'`
                if (printedStats) {
                    this.logger.raw(printedStats);
                }
            }
        };

        const env =
            isWatchCommand || options.watch
                ? { WEBPACK_WATCH: true, ...options.env }
                : { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, ...options.env };

        options.argv = { ...options, env };

        if (isWatchCommand) {
            options.watch = true;
        }

        compiler = await this.createCompiler(options, callback);

        if (!compiler) {
            return;
        }

        const isWatch = (compiler) =>
            compiler.compilers ? compiler.compilers.some((compiler) => compiler.options.watch) : compiler.options.watch;

        if (isWatch(compiler) && this.needWatchStdin(compiler)) {
            process.stdin.on('end', () => {
                process.exit(0);
            });
            process.stdin.resume();
        }
    }
}

module.exports = WebpackCLI;
