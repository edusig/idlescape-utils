const path = require('path');

module.exports = {
  webpack: (config, options) => {
    // Resolver for Typescript Outside next's directory
    const resolvedBaseUrl = path.resolve(config.context, '../');
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(tsx|ts|js|mjs|jsx)$/,
        include: [resolvedBaseUrl],
        use: options.defaultLoaders.babel,
        exclude: excludePath => {
          return /node_modules/.test(excludePath);
        },
      },
    ];
    // Finishes
    return config;
  },
  poweredByHeader: false,
  compress: true,
  onDemandEntries: {
    // Make sure entries are not getting disposed.
    maxInactiveAge: 1000 * 60 * 60,
  },
};