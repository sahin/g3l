const E = require('3x3c');
const clone = require('cl0n3');
const async = require('async');
const colors = require('colors');
const emoji = require('node-emoji');
const notify = require('./Notify');

function pwd() {
  return new Promise(function(resolve, reject) {
    E('cd && pwd')
      .then((value) => {resolve(value.trim() + '/.g3l');})
      .catch((err) => {reject(err)})
  });
}

module.exports.dir = function () {
  return new Promise(function(resolve, reject) {
    pwd()
      .then((value) => {resolve(value)})
      .catch((err) => {reject(err)})
  });
}

module.exports.config = function () {
  return new Promise(function(resolve, reject) {
    pwd()
      .then((dir) => {
        try {
          var config = require(`${dir}/config.json`);
          resolve(config);
        } catch (e) {
          clone.programmatic({url: 'git@github.com:cagataycali/config.git', name: '~/.g3l/'})
           .then((value) => {
             console.log("I'm making a few configuration files for you ..");
             pwd()
               .then((dir) => {
                 console.log('Just few seconds..');
                 var config = require(`${dir}/config.json`);
                 resolve(config)
             }).catch((err) => {console.log(err);reject(err)})
           }).catch((err) => {console.log(err);reject(err)})
        }
      })
      .catch((err) => {console.log(err);reject(err)})
  });
}
