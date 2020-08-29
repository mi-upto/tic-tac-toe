const path = require('path');
const root = process.cwd();

module.exports = config => {
  config.resolve.alias['@'] = path.join(root, 'src');
  return config;
}
