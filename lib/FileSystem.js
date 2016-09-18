// This module for read config.json.
var E = require('3x3c');
var home = require('h0m3');
var async = require('async');
var fs = require('fs');

module.exports.insert = function (obj) {
  return new Promise(function(resolve, reject) {
    home()
      .then((dir) => {
        var path = `${dir}/.g3l/config.json`;
        fs.readFile(path, function(err, data) { // read file to memory
          if (!err) {
              try {
                data = JSON.parse(data.toString());
                data.auto.push(obj);
                fs.writeFile(path, JSON.stringify(data), function(err) { // write file
                    if (err) { // if error, report
                        reject (err);
                    }
                    resolve('Config updated.');
                });
              } catch (e) {
                reject(e);
              }

          } else {
            reject(err);
          }
        });
      })
      .catch((err) => {reject(err);})
  });
}

module.exports.delete = function (cwd) {
  return new Promise(function(resolve, reject) {
    home()
      .then((dir) => {
        var path = `${dir}/.g3l/config.json`;
        fs.readFile(path, function(err, data) { // read file to memory
          if (!err) {
              try {
                data = JSON.parse(data.toString());

                var willRemove = data.auto.filter(function(cwd) {
                  return data.auto.cwd === cwd;
                });

                delete data.auto[willRemove]; // Delete object from json.
                fs.writeFile(path, JSON.stringify(data), function(err) { // write file
                    if (err) { // if error, report
                        reject (err);
                    }
                    resolve('Config updated.');
                });
              } catch (e) {
                reject(e);
              }

          } else {
            reject(err);
          }
        });
      })
      .catch((err) => {reject(err);})
  });
}
