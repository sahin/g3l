#!/usr/bin/env node
var program = require('commander');
var B = require('br4nch');
var _ = require('underscore');
var C = require('c0mm1t');
var async = require('async');
var colors = require('colors');
var E = require('3x3c');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
updateNotifier({pkg}).notify();

program
.option('-m, --message <message>', 'Commit message')
.option('-b, --new_branch <branch>', 'Git push origin as a new branch')
.option('-p, --publish', 'After process publish repo as a npm package')
.option('-i, --init', 'Git init')
.option('-v, --verbose', 'Show process')
.parse(process.argv);

var commands = [
  {
    name: "new_branch",
    command: "git checkout -b ${branch}",
    description: "Git checkout new branch easily",
    priority: 99,
    boolean: false,
    containRequiredParam: true,
    function: "branch",
    params: [
      {
        name: "branch",
      }
    ]
  },
  {
    name: "init",
    command: "git init",
    description: "Git checkout new branch easily",
    priority: 100,
    boolean: true,
    containRequiredParam: false,
    function: "init",
    params: []
  },
  {
    name: "message",
    command: "git add . && git commit -m ${message} && git push origin ${branch}",
    description: "Git commit easily",
    priority: 95,
    boolean: false,
    containRequiredParam: true,
    function: "message",
    params: [
      {
        name: "message",
      }
    ],
  },
  {
    name: "publish",
    command: "npm version patch && npm publish",
    description: "Npm publish easily",
    boolean: true,
    function: "publish",
    priority: 90,
    containRequiredParam: false,
    params: [],
  }
];

function run(array) {
  return new Promise(function(resolve, reject) {
     array.forEach(function(piece) {
       if (eval('program.'+piece.name)) {
         console.log('Running:'.underline, colors.rainbow(piece.name));
         if (piece.containRequiredParam || piece.boolean || eval('program.' + piece.name).length > 2) { /* If is has contain required param? */
            if (piece.boolean) {
              console.log(colors.green(piece.name));
              eval(piece.function + '(' + JSON.stringify(piece) + ').then((value) => {console.log(colors.rainbow(value));}).catch((err) => {console.log(colors.red(err));})');
            } else {
              piece.params.forEach(function(param) {
                console.log(`${colors.green(param.name)}: ${eval('program.'+piece.name).inverse}`);
                eval(piece.function + '(' + JSON.stringify(piece) + ').then((value) => {console.log(colors.rainbow(value));}).catch((err) => {console.log(colors.red(err));})');
              });
            }
         } else {
           console.log(piece.function + '(' + piece + ').then((value) => {console.log(value);}).catch((err) => {console.log(err);})');
           process.exit(1);
         }
       }
     });
     resolve(colors.inverse('Running process started \n\n'))
  });
}

/* Sort by priority */
commands = _.sortBy(commands, 'priority').reverse();

/* Run commands */
run(commands)
  .then((value) => {console.log(value);})
  .catch((err) => {console.log(err);})


  /* ---------- Functions ----------  */


function init(command) {
  return new Promise(function(resolve, reject) {
    B()
      .then((value) => {resolve('Git already initialized this directory')})
      .catch((err) => {
        var prompt = require('prompt');
        prompt.start();
        prompt.get([{name:'url', required: true, description: "Git remote url: Ex. https://github.com/cagataycali/br4anch.git"}], function (err, result) {
          E(`git init && git remote add origin ${result.url} && echo "# Hi" >> README.md && git add . && git commit -m "Hi" && git push -u origin master`)
            .then((value) => {resolve('Git initialized.')})
            .catch((err) => {reject(err)});
        });
    });
  });
}


function branch(command) {
  return new Promise(function(resolve, reject) {
    E(`git checkout -b ${program.new_branch}`)
     .then((value) => {resolve(`New branch created: ${program.new_branch}`);})
     .catch((err) => {reject(err)});
  });
}

function message(command) {
  return new Promise(function(resolve, reject) {
    C(program.message)
    .then(function(value) {resolve(value);})
    .catch(function(err) {reject(err)});
  });
}

function publish(command) {
  return new Promise(function(resolve, reject) {
    E('npm version patch && npm publish')
     .then((value) => {resolve(value);})
     .catch((err) => {reject(err);})
  });
}

  /* ---------- Functions ----------  */
