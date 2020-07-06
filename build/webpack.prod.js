const webpack = require("webpack");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require("./webpack.common");

const config = merge(commonConfig, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    // css抽离
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "chunk/[id].[contenthash:8].css"
    }),
    // 缓存hash
    //如果你引入一个新的模块，会导致 module id 整体发生改变，可能会导致所有文件的chunkhash发生变化
    //HashedModuleIdsPlugin根据模块的相对路径生成一个四位数的hash作为模块id，这样就算引入了新的模块，也不会影响 module id 的值
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    // 它的作用是将包含chunks 映射关系的 list单独从 app.js里提取出来，因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，所以你每次改动都会影响它，如果不将它提取出来的话，等于app.js每次都会改变。缓存就失效了。
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: "all", //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: 1,
          name: "vendors"
        }
      }
    }
  }
});

if (process.env.npm_lifecycle_event == "build:watch") {
  config = merge(config, {
    devtool: "cheap-source-map"
  });
}
if (process.env.npm_lifecycle_event === "build:report") {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
