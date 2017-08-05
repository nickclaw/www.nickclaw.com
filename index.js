require.extensions['.scss'] = function(module, filename) {
  module.exports = {};
}


// start server
if (process.env.NODE_ENV !== "production") {
    require('babel-register');
    require('./src/server');
} else {
  require('./build/server');
}
