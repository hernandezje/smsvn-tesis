const { override, addBabelInclude } = require('customize-cra');
const path = require('path');

module.exports = override(
  addBabelInclude([
    path.resolve('src'),
    path.resolve('node_modules/canvg'), // Transpilar canvg
  ])
);
