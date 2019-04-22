const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return {
    entry: [
      'webpack/hot/dev-server',
      path.join(__dirname, '/src/js/index.ts') // eslint-disable-line
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    resolve: {
      // changed from extensions: [".js", ".jsx"]
      extensions: ['.ts', '.tsx', '.js', '.jsx']
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
    devtool: 'source-map'
  };
};
