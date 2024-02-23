module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(react-native' +
            '|@react-navigation' +
            '|expo(nent)?' +
            '|@expo(nent)?/.*' +
            '|react-navigation' +
            '|@unimodules/.*' +
            '|unimodules' +
            '|sentry-expo' +
            '|native-base' +
            '|react-native-svg' +
            '|@react-native' +
            ')/)',
    ],
};
