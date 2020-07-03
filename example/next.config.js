const withImageElement = require("next-image-element");

module.exports = withImageElement({
  cssModules: true,
  imageElementOptions: {
    sizeLimit: 1024,
    // publicPath: "/static/images",
    // outputPath: 123,
    outputFileNamePattern: "[hash].[ext]",
  },
});
