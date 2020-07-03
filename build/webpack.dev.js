const webpack = require('webpack');
const merge = require('webpack-merge');
// const path = require('path');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  // 开发环境本地启动的服务配置
  devServer: {
    //端口
    port: 9000,
    //热更新
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    // 接口代理转发
    proxy: {
      // '/testapi': {
      //   target: 'https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template',
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: { '^/testapi': '' },
      // },
    },
  },
  //NamedModulesPlugin：HMR时候返回路径
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  //构建速度选择
  devtool: 'eval-source-map',
});
