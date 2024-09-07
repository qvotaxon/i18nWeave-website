// eslint.config.js

const baseConfig = require('../../../eslint.config.js'); // Use require instead of import

module.exports = [
  baseConfig,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@i18n-weave/feat/*", "@i18n-weave/feat/**/*"],
              message: "UI should not import from Features directly."
            }
          ]
        }
      ]
    }
  }
];
