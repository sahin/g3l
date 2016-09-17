var pm2 = require('pm2');
var globalModulesDir = require('global-modules');

pm2.connect(function(err) {
  if (err) {
    console.log(err);
    process.exit(2);
  }

  pm2.start({
    name: process.cwd(),
    script    : `./lib/AutoCommit.js`,
    // script    : `${globalModulesDir}/g3l/lib/AutoCommit.js`,
    exec_mode : 'cluster',
    max_memory_restart : '100M'
  }, function(err, apps) {
    pm2.disconnect();
    if (err) console.log(err);
  });
});
