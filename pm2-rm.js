#!/usr/bin/env node
var globalModulesDir = require('global-modules');
var pm2 = require('pm2');
pm2.delete('0', function(err) {})
pm2.disconnect();
process.exit();
