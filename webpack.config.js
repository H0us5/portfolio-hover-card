const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    script: "./js/script.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "[path][name][ext]",
  },
  devtool: isDev && "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Main",
      template: "./index.html",
      inject: "body",
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
};
