const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const cssnext = require('postcss-cssnext')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './assets'),
    publicPath: '/assets/',
    filename: 'build.js',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      // Only lint local *.vue files
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      // But use vue-loader for all *.vue files
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [cssnext],
        },
      },
      {
        test: /\.js$/,
        loader: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  devtool: '#eval-source-map',
  plugins: [
    new WebpackNotifierPlugin(),
  ],
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ])
}
