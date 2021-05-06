'use strict';

// eslint-disable-next-line node/no-extraneous-require
const stripAnsi = require('strip-ansi');
const globalModulesNpmValue = 'test-npm';

jest.setMock('global-modules', globalModulesNpmValue);
jest.setMock('enquirer', { prompt: jest.fn() });
jest.setMock('../run-command', jest.fn());
jest.setMock('../package-exists', jest.fn());
jest.setMock('../get-package-manager', jest.fn());

const getPackageManager = require('../get-package-manager');
const packageExists = require('../package-exists');
const promptInstallation = require('../prompt-installation');
const runCommand = require('../run-command');
const { prompt } = require('enquirer');

describe('promptInstallation', () => {
    beforeAll(() => {
        packageExists.mockReturnValue(true);
    });
    beforeEach(() => {
        runCommand.mockClear();
        prompt.mockClear();
    });

    it('should prompt to install using npm if npm is package manager', async () => {
        prompt.mockReturnValue({ installConfirm: true });

        getPackageManager.mockReturnValue('npm');

        const preMessage = jest.fn();
        const promptResult = await promptInstallation('test-package', preMessage);

        expect(promptResult).toBeTruthy();
        expect(preMessage.mock.calls.length).toEqual(1);
        expect(prompt.mock.calls.length).toEqual(1);
        expect(runCommand.mock.calls.length).toEqual(1);
        expect(stripAnsi(prompt.mock.calls[0][0][0].message)).toContain(
            "Would you like to install 'test-package' package? (That will run 'npm install -D test-package')",
        );

        // install the package using npm
        expect(runCommand.mock.calls[0][0]).toEqual('npm install -D test-package');
    });

    it('should prompt to install using yarn if yarn is package manager', async () => {
        prompt.mockReturnValue({ installConfirm: true });

        getPackageManager.mockReturnValue('yarn');

        const promptResult = await promptInstallation('test-package');

        expect(promptResult).toBeTruthy();
        expect(prompt.mock.calls.length).toEqual(1);
        expect(runCommand.mock.calls.length).toEqual(1);
        expect(stripAnsi(prompt.mock.calls[0][0][0].message)).toContain(
            "Would you like to install 'test-package' package? (That will run 'yarn add -D test-package')",
        );

        // install the package using yarn
        expect(runCommand.mock.calls[0][0]).toEqual('yarn add -D test-package');
    });

    it('should prompt to install using pnpm if pnpm is package manager', async () => {
        prompt.mockReturnValue({ installConfirm: true });

        getPackageManager.mockReturnValue('pnpm');

        const promptResult = await promptInstallation('test-package');

        expect(promptResult).toBeTruthy();
        expect(prompt.mock.calls.length).toEqual(1);
        expect(runCommand.mock.calls.length).toEqual(1);
        expect(stripAnsi(prompt.mock.calls[0][0][0].message)).toContain(
            "Would you like to install 'test-package' package? (That will run 'pnpm install -D test-package')",
        );

        // install the package using npm
        expect(runCommand.mock.calls[0][0]).toEqual('pnpm install -D test-package');
    });

    it('should support pre message', async () => {
        prompt.mockReturnValue({ installConfirm: true });

        getPackageManager.mockReturnValue('npm');

        const preMessage = jest.fn();
        const promptResult = await promptInstallation('test-package', preMessage);

        expect(promptResult).toBeTruthy();
        expect(preMessage.mock.calls.length).toEqual(1);
        expect(prompt.mock.calls.length).toEqual(1);
        expect(runCommand.mock.calls.length).toEqual(1);
        expect(stripAnsi(prompt.mock.calls[0][0][0].message)).toContain(
            "Would you like to install 'test-package' package? (That will run 'npm install -D test-package')",
        );

        // install the package using npm
        expect(runCommand.mock.calls[0][0]).toEqual('npm install -D test-package');
    });

    it('should not install if install is not confirmed', async () => {
        prompt.mockReturnValue({ installConfirm: false });

        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
        const promptResult = await promptInstallation('test-package');

        expect(promptResult).toBeUndefined();
        expect(prompt.mock.calls.length).toEqual(1);
        // runCommand should not be called, because the installation is not confirmed
        expect(runCommand.mock.calls.length).toEqual(0);
        expect(mockExit.mock.calls[0][0]).toEqual(2);

        mockExit.mockRestore();
    });
});
