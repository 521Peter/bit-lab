const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const resolve = (_path) => path.resolve(__dirname, _path);
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
// 打包分析
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// 清除生产环境的log输出
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
// 文件gzip压缩处理器
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    mode: "production",
    // entry 配置项的 ./ 不用修改为 ../
    entry: "./src/main.js",
    module: {
      rules: [
        {
          // 每个文件只匹配一个loader，剩下的就不匹配了
          oneOf: [
            {
              test: /\.js$/,
              // 只处理src中的js文件
              include: resolve("../src"),
              use: {
                loader: "babel-loader",
                options: {
                  // 开启babel缓存
                  cacheDirectory: true,
                  // 关闭缓存文件压缩
                  cacheCompression: false,
                  presets: ["@babel/preset-env"],
                  // 避免重复引入Babel runtime，减少代码体积
                  plugins: ["@babel/plugin-transform-runtime"],
                },
              },
            },
            {
              test: /\.md$/,
              use: ["html-loader", "markdown-loader"],
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
              type: "asset",
              // 等于或小于10KB的图片将被打包成base64的格式
              parser: {
                dataUrlCondition: {
                  maxSize: 10 * 1024, // 10KB
                },
              },
              generator: {
                // 哈希值用于确保每个图片文件不会重名，[hash:10]是只取哈希值的前10位
                // 而ext是图片扩展名
                filename: "static/img/[hash:10][ext][query]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      // 开启ESLINT缓存
      new ESLintWebpackPlugin({
        // 指定要检查的文件目录
        context: resolve("../src"),
        cache: true,
        // 缓存文件放置的位置
        cacheLocation: resolve("../node_modules/.cache/eslintCache"),
      }),
      new ParallelUglifyPlugin({
        uglifyJS: {
          compress: {
            // 生产环境下，删除所有的log输出
            drop_console: true,
          },
        },
      }),
      // 对匹配的文件类型进行gzip压缩
      new CompressionWebpackPlugin({
        test: /\.(js|css|html)$/,
      }),
    ],
    resolve: {
      extensions: [".js", ".vue", ".json"],
      // 设置文件别名
      alias: {
        "@": resolve("../src"),
        assets: resolve("../src/assets"),
        views: resolve("../src/views"),
        network: resolve("../src/network"),
        components: resolve("../src/components"),
        plugins: resolve("../src/plugins"),
        store: resolve("../src/store"),
      },
    },
    optimization: {
      // 大文件分包
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          quill: {
            test: /(quill)/,
            name: "quill",
            chunks: "all",
            // 优先级，越大则优先处理
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          elementUiCommon: {
            test: /(element-ui.common)/,
            name: "element-ui-common",
            chunks: "all",
            priority: 13,
            reuseExistingChunk: true,
            enforce: true,
          },
          elementui: {
            test: /(element-ui)/,
            name: "elementui",
            chunks: "all",
            priority: 13,
            reuseExistingChunk: true,
            enforce: true,
          },
          lodash: {
            test: /(lodash)/,
            name: "lodash",
            chunks: "all",
            priority: 15,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    },
    devtool: "nosources-source-map",
    // 缓存整个项目
    // cache: {
    //   type: "filesystem",
    //   allowCollectingMemory: true,
    // },
  },
});
