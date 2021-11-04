const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/static.js",
  devServer: {
    contentBase: "./dist",
    port: 9000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    watchOptions: {
      aggregateTimeout: 500, // delay before reloading
      poll: 1000, // enable polling since fsevents are not supported in docker
    },
  },
  devtool: "inline-source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/assets", to: "assets" },
        { from: "public/static/style.css", to: "." },
        { from: "public/static/favicon.ico", to: "." },
      ],
    }),
    new HTMLWebpackPlugin({
      template: "public/static/index.html",
      filename: "index.html",
    }),
  ],
};
