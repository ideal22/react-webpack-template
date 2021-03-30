const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  optimization,
  filename,
  babelOptions,
  plugins,
} = require('./webpack.utils')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.jsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 8080,
    hot: isDev,
    open: true,
  },
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif|ico|icon)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(jsx|js|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelOptions(),
      },
    ],
  },
}
