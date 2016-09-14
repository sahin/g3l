var pathExists = require('path-exists');
var async = require('async');

module.exports = function (path) {
  pathExists('~/.g3l.json')
    .then(function(exists) {exists ? resolve() : null;})
    .catch((err) => {reject()});
}
