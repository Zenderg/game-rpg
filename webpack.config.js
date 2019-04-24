const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'src/js/index.js')
    ],
    vendor: ['phaser']
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    library: '[name]',
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  watch: true,
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: true,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      },
      hash: false
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./', './div']
      },
      notify: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
    ]
  }
};
