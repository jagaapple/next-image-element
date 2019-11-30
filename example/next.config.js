const withImageElement = require("next-image-element");

module.exports = withImageElement({
  imageElementOptions: {
    sizeLimit: 10240,
  },
});
