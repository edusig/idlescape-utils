const path = require('path');
const withPreact = require('next-plugin-preact')

module.exports = withPreact({
  poweredByHeader: false,
});
