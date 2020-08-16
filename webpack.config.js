const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./main.jsx",
  output: {
    path: path.resolve(__dirname, "./src/docs/public"),
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".js", ".json", ".png"],
    /* alias: {
      "@models": path.resolve(__dirname, "models"),
      "@": path.resolve(__dirname, "src"),
    }, */
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
