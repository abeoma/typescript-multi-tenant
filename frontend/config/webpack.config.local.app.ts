import { WebpackOptionsNormalized } from "webpack";
import { createProxyMiddleware } from "http-proxy-middleware";
import baseConfig from "./webpack.config";

const tenantId = "barasu-dev";
const proxy = createProxyMiddleware({
  target: "http://localhost:5005",
  onProxyReq: function (req, _res, _proxyOptions) {
    req.setHeader("X-TENANT", tenantId);
  },
});

const config: WebpackOptionsNormalized = {
  ...baseConfig,
  devServer: {
    historyApiFallback: {
      index: "/dist/index.html",
    },
    proxy: {
      "/api": proxy,
    },
  },
};

export default config;
