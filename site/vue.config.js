const path = require("path");

const resolve = dir => {
    return path.join(__dirname, dir);
};
module.exports = {

    devServer: {
        open: true, // 运行 npm run serve 后自动打开浏览器
        // host: "127.0.0.0"
        // host: "localhost", // 主机名
        port: 8081, // 端口号
        https: false, // 启动的时候会把http改为https,会给你提示一些警告信息'
    },

    publicPath: process.env.NODE_ENV === "production" ? "/pcsite" : "/",
    lintOnSave: false, //不需要使用eslint，把lintOnSave设为false即可
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set("_c", resolve("src/components"));
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    // devServer: {
    //   proxy: 'localhost:3000'
    // }
};
