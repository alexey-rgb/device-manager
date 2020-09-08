const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "./src/docs/public"),
    filename: "main.bundle.js",
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
    new CleanWebpackPlugin(),
    /*  new CopyPlugin({
      patterns: [{ from: "./components", to: "./docs/public/components" }],
    }), */
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
