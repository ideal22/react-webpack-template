const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  optimization,
  filename,
  plugins,
  cssLoaders,
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
    extensions: ['.js', '.json', '.png', '.jsx', '.ts', '.tsx'],
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
        use: cssLoaders(),
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
        test: /\.less$/,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(jsx|js|ts)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
    ],
  },
}
