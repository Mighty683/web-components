const path = require("path");

module.exports = {
  stories: ["../src/**/stories/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/web-components",
  noPostcss: true,
  webpackFinal: async (config, { configType }) => {
    // Remove all css related loaders
    config.module.rules = config.module.rules.filter(rule => {
      return !(rule.test?.test && rule.test?.test(".css"));
    });
    config.module.rules.push({
      test: /\.css$/,
      use: ["raw-loader"],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
};
