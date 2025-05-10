module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"\\.(svg|jpg|jpeg|png|gif)$": "<rootDir>/__mocks__/fileMock.js",
		"^@assets/(.*)\\.svg$": "<rootDir>/__mocks__/fileMock.js",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
