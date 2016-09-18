const notifier = require('node-notifier');
const exist = require('3x1st');
const colors = require('colors');
const E = require('3x3c');
const clone = require('cl0n3');
const async = require('async');
const assets = require('./Assets');
const status = { "resolve" : 'g3l_emerald.png', "reject" : 'g3l_reject.png', "auto": "g3l_midnight.png"};

module.exports = function (obj) {
 return new Promise(function(resolve, reject) {
   assets.config()
     .then((config) => {
       if (config.notify) {
         assets.dir()
           .then((dir) => {
             var end;
             if (obj.status === 'resolve') {
               end = '💪';
             } else if (obj.status === 'auto') {
               end = '💫';
             } else {
               end = '💩';
             }
             notifier.notify({
               title: obj.title,
               message: obj.message + ' ' + end,
              //  subtitle: obj.subtitle,
               icon: `${dir}/g3l_midnight.png`,
               contentImage: `${dir}/${status[obj.status]}`,
               sound: true,
               wait: true
             }, function (err, res) {
               resolve()
             });
           }).catch((err) => {console.log(err);})
       } else {
         console.log('\u0007');
       }
     }).catch((err) => {console.log(err);})
 });
}
