import baseConfig from "./webpack.config";
import { merge } from "webpack-merge";
import webpack from "webpack";

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
