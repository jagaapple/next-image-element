module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      // Rejects old Next.js.
      if (!options.defaultLoaders) {
        throw new Error("This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade");
      }

      // Gets webpack options.
      const { isServer } = options;
      const imageElementOptions = nextConfig.imageElementOptions || {};

      // Sets a loader.
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "react-image-element-loader",
        options: {
          sizeLimit: imageElementOptions.sizeLimit,
          fallback: {
            loader: "file-loader",
            options: {
              publicPath: `${imageElementOptions.pathPrefix || ""}/_next/static/images/`,
              outputPath: `${isServer ? "../" : ""}static/images/`,
              name: "[name]-[hash].[ext]",
            },
          },
        },
        exclude: /node_modules/,
      });

      if (typeof nextConfig.webpack === "function") return nextConfig.webpack(config, options);

      return config;
    },
  });
