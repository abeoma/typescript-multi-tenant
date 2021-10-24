import HtmlWebPackPlugin from "html-webpack-plugin";
import path from "path";

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./index.html",
  filename: "./index.html",
});
module.exports = {
  entry: "./index.tsx",
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  plugins: [htmlWebpackPlugin],
};
