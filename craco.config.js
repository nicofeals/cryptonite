const CracoLessPlugin = require('craco-less');
const CracoEslintWebpackPlugin = require('craco-eslint-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@theme': 'dark',
                '@primary-color': '#0071bc',
                '@heading-color': '#ffffff',
                '@text-color': '#DFF1F4',
                '@text-color-secondary': '#DFF1F4',
                '@link-color': '#0071bc',
                '@body-background': 'rgb(26, 26, 26)',
                '@component-background': 'rgb(26, 26, 26)',
                '@layout-body-background': 'rgb(26, 26, 26)',
                '@layout-header-background': 'rgb(26, 26, 26)',
                '@layout-trigger-background': '#282828',
                '@menu-dark-inline-submenu-bg': '#282828',
            },
            javascriptEnabled: true,
          },
        },
        skipPreflightCheck: true,
        eslintOptions: {
          files: 'src/**/*.{js,jsx,ts,tsx}',
          lintDirtyModulesOnly: true,
        },
      },
    },
  ],
};