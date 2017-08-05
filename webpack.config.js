const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: __dirname + '/src/client/client.js',

  output: {
    path: __dirname + '/build/assets/static/',
    filename: '[name].js',
    publicPath: '/static/',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          {
            'loader': 'postcss-loader',
            options: { plugins: loader => ([
              autoprefixer({ browsers: ['last 2 versions'] })
            ])}
          },
          'sass-loader'
        ]),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader',
          'image-webpack-loader'
        ],
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify('development'),
    }),

    new ExtractTextPlugin("[name].css"),
    new AssetsPlugin({
      filename: 'assets.json',
      prettyPrint: true,
    }),
  ]
}
