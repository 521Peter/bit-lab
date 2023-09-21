const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const resolve = (_path) => path.resolve(__dirname, _path);
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    mode: "development",
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
              loader: "babel-loader",
              options: {
                // 开启babel缓存
                cacheDirectory: true,
                // 关闭缓存文件压缩
                cacheCompression: false,
              },
            },
            {
              test: /\.md$/,
              use: ["html-loader", "markdown-loader"],
            },
          ],
        },
      ],
    },
    plugins: [
      // 开启ESLINT缓存
      new ESLintWebpackPlugin({
        // 指定要检查的文件目录
        context: resolve("../src"),
        cache: true,
        // 缓存文件放置的位置
        cacheLocation: resolve("../node_modules/.cache/eslintCache"),
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
    devServer: {
      // 配置代理服务器（只在开发环境中生效;生产环境中，需要使用其他方式来配置代理服务器）
      proxy: {
        "/bitlab": {
          // 只要请求前缀是“/bitlab”，就通过代理服务器将请求转发给target
          target: "http://47.120.42.169:8088",
          changeOrigin: true, // 同源策略 ：协议 端口 域名  在本地创建一个虚拟服务器，我们通过请求虚拟服务器来获取数据，虚拟服务器模拟同源策略和服务器进行通信，将获得的数据传回客户端
          ws: true, // websocket
          secure: false, // 服务器地址是否是https
          pathRewrite: {
            "^/bitlab": "", // 路径重写
          },
        },
        // 静态资源CDN加速的接口
        "/ailiyun": {
          target: "https://bit-img.oss-cn-guangzhou.aliyuncs.com", // 请求的第三方接口  公网的一个接口地址
          changeOrigin: true, // 同源策略 ：协议 端口 域名  在本地创建一个虚拟服务器，我们通过请求虚拟服务器来获取数据，虚拟服务器模拟同源策略和服务器进行通信，将获得的数据传回客户端
          secure: true, // 服务器地址是否是https
          pathRewrite: {
            "^/ailiyun": "",
          },
        },
      },
    },
    devtool: "source-map",
    // 缓存整个项目
    cache: {
      type: 'memory',
    },
  },
}); 
