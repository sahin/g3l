#!/usr/bin/env node
var program = require('commander');
var emoji = require('node-emoji');
var bugsnag = require("bugsnag");
bugsnag.register("ae3b5df916a42d652f9a9dd8c34009bd");
var B = require('br4nch');
var _ = require('underscore');
var C = require('c0mm1t');
var async = require('async');
var colors = require('colors');
var E = require('3x3c');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
updateNotifier({pkg}).notify();
var CR = require('cr34t3');

program
.option('-m, --message <message>', 'Commit message')
.option('-b, --new_branch <branch>', 'Git push origin as a new branch')
.option('-p, --publish', 'After process publish repo as a npm package')
.option('-i, --init', 'Git init')
.option('-s, --status', 'Git status')
.option('-c, --create', 'Create github repository')
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
  },
  {
    name: "status",
    command: "git status",
    description: "Git status",
    boolean: true,
    function: "status",
    priority: 90,
    containRequiredParam: false,
    params: [],
  },
  {
    name: "create",
    command: "git create new repo",
    description: "Create new github repository",
    boolean: true,
    function: "create",
    priority: 90,
    containRequiredParam: false,
    params: [],
  }
];

function run(array) {
  return new Promise(function(resolve, reject) {
     array.forEach(function(piece) {
       if (eval('program.'+piece.name)) {
         console.log(emoji.emojify(':zap:') ,'Running:'.underline, colors.rainbow(piece.name), ":dark_sunglasses: \n");
         if (piece.containRequiredParam || piece.boolean || eval('program.' + piece.name).length > 2) { /* If is has contain required param? */
            if (piece.boolean) {
              console.log(emoji.emojify(':zap:') ,colors.green(piece.name));
              eval(piece.function + '(' + JSON.stringify(piece) + ').then((value) => {console.log(colors.rainbow(value));}).catch((err) => {console.log(colors.red(err));})');
            } else {
              piece.params.forEach(function(param) {
                console.log(emoji.emojify(':zap:') ,`${colors.green(param.name)}: ${eval('program.'+piece.name).inverse}`);
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
            .catch((err) => {bugsnag.notify(new Error(err));reject(err)});
        });
    });
  });
}


function branch(command) {
  return new Promise(function(resolve, reject) {
    E(`git checkout -b ${program.new_branch}`)
     .then((value) => {resolve(`New branch created: ${program.new_branch}`);})
     .catch((err) => {bugsnag.notify(new Error(err));reject(err)});
  });
}

function message(command) {
  return new Promise(function(resolve, reject) {
    C(program.message)
    .then(function(value) {resolve(value);})
    .catch(function(err) {bugsnag.notify(new Error(err));reject(err)});
  });
}

function publish(command) {
  return new Promise(function(resolve, reject) {
    E('npm version patch && npm publish')
     .then((value) => {resolve(value);})
     .catch((err) => {bugsnag.notify(new Error(err));reject(err);})
  });
}

function status(command) {
  return new Promise(function(resolve, reject) {
    E('git status')
     .then((value) => {resolve(value);})
     .catch((err) => {bugsnag.notify(new Error(err));reject(err);})
  });
}

function create(command) {
  return new Promise(function(resolve, reject) {
     console.log(emoji.emojify(' :rotating_light: '), emoji.emojify(colors.green(`Be sure about your github username already set in your git config, run: `)), colors.inverse('git config --global github.user <username>'));
     console.log(emoji.emojify(' :rotating_light: '), emoji.emojify(colors.green(`Be sure about your ssh keys registered in github, look at: `)), colors.inverse('https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/'));
     CR()
       .then((value) => {
         resolve(emoji.emojify(`:sunglasses: Horarayy! You can init your repository easily with this command: g3l -i`));
       })
       .catch((err) => {reject(err);});
  });
}

  /* ---------- Functions ----------  */
