const webpack = require('webpack');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './frontend/js/main.js',
    calc: './frontend/js/calc.js',
    general: './frontend/stylesheets/general.scss',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: './js/[name].js',
    sourceMapFilename: '[filebase].map',
    
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }],
            ],
          },
        }],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader?presets[]=es2015',
          },
        },
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },

            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('autoprefixer')(),
                  ];
                },
              },
            },
            'sass-loader',
          ],
        }),
      },
    ],
  },
  resolve: {
    alias: {
      Styles: path.resolve(__dirname, 'frontend/stylesheets'),
      vue: 'vue/dist/vue.js',
      vueComponents: path.resolve(__dirname, 'frontend/vue-components'),
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'frontend/fonts', to: '../public/fonts' },
    ]),
    new ExtractTextPlugin({
      filename: '/css/[name].css?[hash]',
      allChunks: true,
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://pershii.web/',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'js/commons.js',
      minChunks: 2,
    }),
  ],
};