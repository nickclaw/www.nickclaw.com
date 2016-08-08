const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    'main': './src/client/client.js',
  },
  output: {
    path: './build/static/',
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'], { allChunks: true }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.svg$/,
        loader: 'text',
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file',
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify('development'),
      "process.env.SITE_URL": JSON.stringify('http://localhost:8080'),
    }),

    new ExtractTextPlugin("styles.css"),
    new AssetsPlugin({
      filename: 'assets.json',
      prettyPrint: true,
    }),
  ],


  //
  // Configs
  //

  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ]
}
