const { prompt } = require('enquirer');
const utils = require('./index');

/**
 *
 * @param packageName
 * @param preMessage Message to show before the question
 */
async function promptInstallation(packageName, preMessage) {
    const packageManager = utils.getPackageManager();

    if (!packageManager) {
        utils.logger.error("Can't find package manager");
        process.exit(2);
    }

    if (preMessage) {
        preMessage();
    }

    // yarn uses 'add' command, rest npm and pnpm both use 'install'
    const commandToBeRun = `${packageManager} ${[packageManager === 'yarn' ? 'add' : 'install', '-D', packageName].join(' ')}`;
    const { colors } = utils;

    let installConfirm;

    try {
        ({ installConfirm } = await prompt([
            {
                type: 'confirm',
                name: 'installConfirm',
                message: `Would you like to install '${colors.green(packageName)}' package? (That will run '${colors.green(
                    commandToBeRun,
                )}')`,
                initial: 'Y',
                stdout: process.stderr,
            },
        ]));
    } catch (error) {
        utils.logger.error(error);
        process.exit(2);
    }

    if (installConfirm) {
        try {
            await utils.runCommand(commandToBeRun);
        } catch (error) {
            utils.logger.error(error);
            process.exit(2);
        }

        return utils.packageExists(packageName);
    }

    process.exit(2);
}

module.exports = promptInstallation;
