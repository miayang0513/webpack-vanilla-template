const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: [path.join(__dirname, '../src/pages/index/index.js'), path.join(__dirname, '../src/pages/index/index.scss')],
    main: path.join(__dirname, '../src/main.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `img/[name].[hash:8].[ext]`,
              publicPath: '../',
              esModule: false,
            }
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/pages/index/index.html'),
      filename: 'index.html',
      chunks: ['index', 'main']
    })
  ]
}
