const path = require("path");

module.exports = {
  core: {
    builder: "@storybook/builder-vite",
  },
  stories: ["../src/**/stories/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/html",
  async viteFinal(config, { configType }) {
    config.resolve.dedupe = ["@storybook/client-api"];
    return config;
  },
  noPostcss: true,
};
