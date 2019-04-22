const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return {
    entry: './src/js/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: ['babel-loader', 'eslint-loader']
        },
        // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' } },
        { test: /\.ts?$/, use: { loader: 'awesome-typescript-loader' } },
        // addition - add source-map support
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        {
          test: /\.html$/,
          include: path.resolve(__dirname, 'src/'),
          use: ['raw-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash].[ext]'
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
      })
    ],
    devServer: {
      hot: true,
      contentBase: './dist',
      port: 3000
    },
    devtool: 'source-map',
    watch: true
  };
};
