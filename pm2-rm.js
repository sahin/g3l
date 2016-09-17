var globalModulesDir = require('global-modules');
var pm2 = require('pm2');
pm2.delete('index', function(err) {})
pm2.disconnect();
