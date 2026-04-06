const { createDefaultPreset } = require('ts-jest');

/** @type {import("jest").Config} **/
module.exports = {
	testMatch: ['<rootDir>/lib/__tests__/**/*.test.ts'],
	setupFilesAfterEnv: ['<rootDir>/lib/__tests__/testSetup.ts'],
	...createDefaultPreset(),
};
