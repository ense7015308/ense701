// //module.exports = {
//     // Specify the test environment (e.g., jsdom for browser-like environment)
//     testEnvironment: 'jsdom',
  
//     // Define the test file patterns (glob patterns)
//     testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  
//     // Configure Jest to use the Babel preset for transpiling JavaScript code
//     transform: {
//       '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // For JavaScript and TypeScript files
//       '^.+\\.css$': 'jest-transform-css',      // For CSS files
//       '^.+\\.scss$': 'jest-transform-scss',    // For SCSS files
//     },
  
//     // Specify file extensions for TypeScript, CSS, and SCSS
//     moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'css', 'scss'],
  
//     // Optionally, define a list of paths to modules that run before each test
//     setupFilesAfterEnv: ['./jest.setup.js'],
// //};  
module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  }
};