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
      const jsFilePattern = /\.(jsx?|tsx?)$/;
      const fileLoaderFallbackSetting = {
        loader: "file-loader",
        options: { publicPath, outputPath, name: outputFileNamePattern },
      };
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/,
        oneOf: [
          {
            loader: "react-image-element-loader",
            options: {
              sizeLimit: imageElementOptions.sizeLimit,
              fallback: fileLoaderFallbackSetting,
            },
            exclude: /node_modules/,
            issuer: { include: jsFilePattern },
          },
          {
            loader: "url-loader",
            options: {
              esModule: false,
              limit: imageElementOptions.sizeLimit,
              fallback: fileLoaderFallbackSetting,
            },
            exclude: /node_modules/,
            issuer: { exclude: jsFilePattern },
          },
        ],
      });

      // The following is based on:
      // https://github.com/cyrilwanner/next-optimized-images/commit/f122b9031d70ebcf60e82b7b3a20ce0259d11c66#diff-6d186b954a58d5bb740f73d84fe39073R44
      if (config.module.rules) {
        config.module.rules.forEach((rule) => {
          if (!rule.oneOf) return;

          rule.oneOf.some((subRule) => {
            if (!subRule.issuer) return false;
            if (subRule.test) return false;
            if (subRule.include) return false;
            if (!subRule.exclude) return false;
            if (!subRule.use) return false;
            if (!subRule.use.options) return false;
            if (!subRule.use.options.name) return false;
            if (!subRule.use.options.name.startsWith("static/media/")) return false;

            const expectedRegExpString = "/\\.(css|scss|sass)$/";
            if (String(subRule.issuer) !== expectedRegExpString && String(subRule.issuer.test) !== expectedRegExpString) {
              return false;
            }

            subRule.exclude.push(/\.(jpg|jpeg|png|svg|webp|gif|ico)$/);

            return true;
          });
        });
      }

      return typeof nextConfig.webpack === "function" ? nextConfig.webpack(config, options) : config;
    },
  });
