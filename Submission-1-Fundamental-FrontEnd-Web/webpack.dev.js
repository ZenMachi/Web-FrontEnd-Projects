const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    hot: false, // optional, but you must not set both hot and liveReload to true
    liveReload: true,
  },
});
