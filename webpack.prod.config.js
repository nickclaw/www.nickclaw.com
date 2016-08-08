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
    filename: '[name]-[hash].js',
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
        loader: 'text'
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify('production'),
      "process.env.SITE_URL": JSON.stringify('https://www.topsecret.io'),
      "typeof window": JSON.stringify("object"),
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin(),

    new ExtractTextPlugin("styles-[contentHash].css"),
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
