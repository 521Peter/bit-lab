const devConfig = require("./config/webpack.development");
const proConfig = require("./config/webpack.production");

module.exports = process.env.NODE_ENV === "production" ? proConfig : devConfig;
