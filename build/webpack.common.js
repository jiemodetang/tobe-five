const path = require('path');

// 新建html
const HtmlWebpackPlugin = require('html-webpack-plugin');

//抽取独立的css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 将单个文件或整个目录复制到构建目录
const CopyWebpackPlugin = require('copy-webpack-plugin');

//多线程打包
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const srcDir = path.join(__dirname, '../src');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/app.js'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash].js',
    // publicPath: "/",
    //chunkFilename 指未列在 entry 中，却又需要被打包出来的文件的名称。
    chunkFilename: 'chunk/[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   include: [srcDir],
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   options: {
      //     fix: true,
      //   },
      // },
      {
        test: /\.(js|jsx)$/,
        include: [srcDir],
        exclude: /(node_modules|bower_components)/,
        use: ['happypack/loader?id=happybabel'],
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: ['url-loader'],
        include: [srcDir],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: ['url-loader'],
        include: [srcDir],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['url-loader'],
        include: [srcDir],
      },
    ],
  },
  plugins: [
    // 开启 happypack 的线程池
    new HappyPack({
        //用id来标识 happypack处理那里类文件
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 缓存
      cache: true,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    //新建html
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`,
    }),
    //复制文件
    new CopyWebpackPlugin([
      // {
      //   from: `${srcDir}/assets/images/nowthen.jpg`,
      //   to: 'nowthen.jpg',
      // },
    ]),
  ],
  //路径别名
  resolve: {
    alias: {
      '@': srcDir,
      '@pages': `${srcDir}/pages`,
    },
  },
};
