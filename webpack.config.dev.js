const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src-old/client.js",
  devServer: {
    contentBase: "./dist",
    port: 9000,
  },
  devtool: "inline-source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/assets", to: "assets" },
        { from: "public/style.css", to: "." },
        { from: "public/favicon.ico", to: "." },
      ],
    }),
    new HTMLWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
    }),
  ],
};
