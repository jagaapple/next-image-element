const defaultPublicPath = "/_next/static/images/";
const defaultOutputPath = (isServer) => `${isServer ? "../" : ""}static/images/`;
const defaultOutputFileNamePattern = "[name]-[hash].[ext]";

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      // Gets webpack options.
      const { isServer } = options;

      // Gets this package options.
      const imageElementOptions = nextConfig.imageElementOptions || {};
      const publicPath = (() => {
        const publicPathOption = imageElementOptions.publicPath;
        if (publicPathOption == undefined) return defaultPublicPath;
        if (typeof publicPathOption === "string") return publicPathOption;

        throw new Error('"publicPath" option must be string');
      })();
      const outputPath = (() => {
        const outputPathOption = imageElementOptions.outputPath;
        if (outputPathOption == undefined) return defaultOutputPath(isServer);
        if (typeof outputPathOption === "function") return outputPathOption(isServer);
        if (typeof outputPathOption === "string") return outputPathOption;

        throw new Error('"outputPath" option must be function or string');
      })();
      const outputFileNamePattern = (() => {
        const outputFileNamePatternOption = imageElementOptions.outputFileNamePattern;
        if (outputFileNamePatternOption == undefined) return defaultOutputFileNamePattern;
        if (typeof outputFileNamePatternOption === "string") return outputFileNamePatternOption;

        throw new Error('"outputFileNamePattern" option must be string');
      })();

      // Sets a loader.
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "react-image-element-loader",
        options: {
          sizeLimit: imageElementOptions.sizeLimit,
          fallback: {
            loader: "file-loader",
            options: { publicPath, outputPath, name: outputFileNamePattern },
          },
        },
        exclude: /node_modules/,
      });

      if (typeof nextConfig.webpack === "function") return nextConfig.webpack(config, options);

      return config;
    },
  });
