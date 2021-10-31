import webpack from "webpack";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.config";

const tenantId = "barasu-dev";

const config: webpack.Configuration = merge(baseConfig, {
  devServer: {
    historyApiFallback: {
      index: "/dist/index.html",
    },
    proxy: {
      "/api": {
        target: "http://localhost:5005",
        headers: { "X-TENANT": tenantId },
      },
    },
  },
});

export default config;
