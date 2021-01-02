var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.png|jpg$/,
        exclude: /node_modules/,
        loader: "file-loader",
      },
    ],
  },
};
