// Helper for combining webpack config objects
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    // overwrite values here
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        "fs": false,
        "assert": false,
        "glob": false,
        "path-browserify": false,
        "util": false,
    }
  }
});
};
