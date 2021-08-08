// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
};

module.exports = config;

// Or async function 薛新ruirui
module.exports = async () => {
  return {
    verbose: true,
      "collectCoverageFrom": [ "**/*.{js,jsx}", "!**/node_modules/**",],
    "collectCoverage": true,
    "coverageReporters": ["html", "text"],
  };
};