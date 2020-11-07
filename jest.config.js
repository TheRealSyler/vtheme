module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
  roots: ['<rootDir>/src'],
  coveragePathIgnorePatterns: ['<rootDir>/src/logger.ts', '/node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.ts', "jest-localstorage-mock", "jest-canvas-mock"],
};
