const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.(js|jsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs/register',
    // {
    //   name: '@storybook/addon-docs',
    //   options: {
    //     configureJSX: true,
    //   },
    // },
  ],
  // webpackFinal: async config => {
  //   config.resolve.alias = {
  //     '@src': path.resolve(__dirname, '../src'),
  //   };
  //   return config;
  // },
};
