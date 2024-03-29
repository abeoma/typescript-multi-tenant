import HtmlWebPackPlugin from "html-webpack-plugin";
import merge from "webpack-merge";
import path from "path";
import webpack from "webpack";

const isProduction = process.env.NODE_ENV === "production";

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: path.resolve(__dirname, "../index.html"),
  filename: "./index.html",
});

const typescriptRule = {
    test: /\.tsx?$/u,
    use: {
      loader: "ts-loader",
    },
    include: [
      path.resolve(__dirname, "../app"),
      path.resolve(__dirname, "../lib"),
      path.resolve(__dirname, "../../node_modules/@barasu/common"),
    ],
    exclude: [/\.test\.tsx?$/u],
  },
  jsRule = {
    test: /\.js$/u,
    exclude: /node_modules/u,
    use: {
      loader: "babel-loader",
    },
  },
  cssRule = {
    test: /\.css$/u,
    use: ["css-loader"],
    include: [path.resolve(__dirname, "node_modules/semantic-ui-css")],
  };

type Mode = "production" | "development";
const mode: Mode = isProduction ? "production" : "development";

const baseConfig: webpack.Configuration = {
  mode,
  context: __dirname,
  cache: !isProduction && {
    type: "filesystem" as const,
    buildDependencies: {
      config: [__filename],
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/u,
          name: "vendor",
          chunks: "initial" as const,
          enforce: true,
        },
      },
    },
  },
  output: {
    filename: "[name]-[contenthash].js",
    publicPath: "/dist/",
    path: path.join(__dirname, process.env.DIST_PATH || "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: ["node_modules"],
    alias: {
      "date-fns": "date-fns/esm",
      // Trailing $ is needed because lodash-es does not support lodash/fp.
      lodash: "lodash-es",
    },
    symlinks: false,
  },
  experiments: {},
  externals: {},
  externalsPresets: {},
  infrastructureLogging: {},
  node: {},
  resolveLoader: {},
  snapshot: {},
  stats: {},
  watchOptions: {},
};

const config: webpack.Configuration = merge(baseConfig, {
  entry: { main: { import: [path.join(__dirname, "../app/", "index.tsx")] } },
  module: {
    defaultRules: [],
    generator: {},
    parser: {},
    rules: [typescriptRule, jsRule, cssRule],
  },
  plugins: [htmlWebpackPlugin],
  devServer: {
    host: "0.0.0.0",
    port: 80,
    hot: "only",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});

export default config;
