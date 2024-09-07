// config-overrides.js
const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  (config) => {
    config.resolve.fallback = {
      "crypto": require.resolve("crypto-browserify")
    };

    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ]);

    return config;
  }
);
