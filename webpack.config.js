const path = require("path");

// 引入html插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 引入clean插件
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

// webpack配置信息
module.exports = {
  mode: "development",
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件目录
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",

    environment: {
      // 不使用箭头函数
      arrowFunction: false,
      // 不使用const
      const: false,
    },
  },
  // 指定webpack打包时使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      // 设置ts文件处理
      {
        // 指定生效的文件
        test: /\.ts$/,
        use: [
          // 配置babel
          {
            loader: "babel-loader",
            // 设置预定义环境
            options: {
              presets: [
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    targets: {
                      // 要兼容的目标浏览器
                      chrome: "58",
                      ie: "11",
                    },
                    // 指定core-js的版本
                    corejs: "3",
                    // 使用core-js的方式 usage表示按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 指定排除的文件
        exclude: /node-modules/,
      },
      // 设置less文件处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 配置postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  // 配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: 可自定义网页title
      // template：自定义网页模版
      template: "./src/index.html",
    }),
  ],
  // 配置引用模块
  resolve: {
    extensions: [".ts", ".js"],
  },
};
