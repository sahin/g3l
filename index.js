#!/usr/bin/env node
var program = require('commander');
var emoji = require('node-emoji');
var B = require('br4nch');
var _ = require('underscore');
var C = require('c0mm1t');
var m4g1c = require('m4g1c');
var async = require('async');
var colors = require('colors');
var E = require('3x3c');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
var CR = require('cr34t3');
var inquirer = require('inquirer');
var S = require('./lib/git-heads');
var opn = require('opn');
updateNotifier({pkg}).notify();

program
.option('-m, --message <message>', 'Commit message')
.option('-b, --new_branch <branch>', 'Git push origin as a new branch')
.option('-p, --publish', 'After process publish repo as a npm package')
.option('-i, --init', 'Git init')
.option('-s, --status', 'Git status')
.option('-c, --create', 'Create github repository')
.option('--clone', 'Clone github repository')
.option('-u, --update', 'Self update')
.parse(process.argv);

function log(message) {
  console.log(emoji.emojify(':zap:'), colors.underline.white('Running') ,colors.cyan(message));
}

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
    priority: 80,
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
  },
  {
    name: "clone",
    command: "Git clone existing repository",
    description: "Git clone existing repository",
    boolean: true,
    function: "clone",
    priority: 89,
    containRequiredParam: false,
    params: [],
  },
  {
    name: "update",
    command: "Self update",
    description: "Self update",
    boolean: true,
    function: "update",
    priority: 1,
    containRequiredParam: false,
    params: [],
  }
];

function run(array) {
  return new Promise(function(resolve, reject) {
     array.forEach(function(piece) {
       if (eval('program.'+piece.name)) {
         if (piece.containRequiredParam || piece.boolean || eval('program.' + piece.name).length > 2) { /* If is has contain required param? */
            if (piece.boolean) {
              eval(piece.function + '(' + JSON.stringify(piece) + ').then((value) => {console.log(colors.grey(value));}).catch((err) => {console.log(colors.red(err));bugsnag.notify(new Error(err));})');
            } else {
              piece.params.forEach(function(param) {
                eval(piece.function + '(' + JSON.stringify(piece) + ').then((value) => {console.log(colors.grey(value));}).catch((err) => {console.log(colors.red(err));bugsnag.notify(new Error(err));})');
              });
            }
         } else {
           process.exit();
         }
       }
     });
     resolve('')
  });
}

/* Sort by priority */
commands = _.sortBy(commands, 'priority').reverse();

/* Run commands */
run(commands)
  .then((value) => {console.log(value);})
  .catch((err) => {console.log(err);})

function init(command) {
  return new Promise(function(resolve, reject) {
    B()
      .then((value) => {resolve('Git already initialized this directory')})
      .catch((err) => {

        var questions = [
          {
            type: 'input',
            name: 'url',
            message: 'What\'s your git repository url?'
          }
        ];

        inquirer.prompt(questions).then(function (answers) {
          E(`git init && git remote add origin ${answers.url} && git remote show origin && git symbolic-ref HEAD && echo "# This github repository created automaticly with g3l! :zap:" >> README.md && git add . && git commit -m "Hi :zap:" && git push -u origin master`)
              .then((value) => {
                B()
                  .then((out) => {resolve(out)})
                  .catch((err) => {reject(err)})
              })
              .catch((err) => {reject(err)});
        });
    });
  });
}

function branch(command) {
  return new Promise(function(resolve, reject) {
    log('Checkout new branch');
    E(`git checkout -b ${program.new_branch}`)
     .then((value) => {resolve(`New branch created: ${program.new_branch}`);})
     .catch((err) => {bugsnag.notify(new Error(err));reject(err)});
  });
}

function message(command) {
  return new Promise(function(resolve, reject) {
    log('Git commit and push proccess');
    C(program.message)
      .then(function(value) {resolve('Git committed successfully.');})
      .catch(function(err) {bugsnag.notify(new Error(err));reject(err)});
  });
}

function publish(command) {
  return new Promise(function(resolve, reject) {
    log('Version patch and publish as npm package');
    E('npm version patch && npm publish')
     .then((value) => {resolve(value);})
     .catch((err) => {bugsnag.notify(new Error(err));reject(err);})
  });
}

function status(command) {
  return new Promise(function(resolve, reject) {
    S();
    resolve();
  });
}

function update(command) {
  return new Promise(function(resolve, reject) {
    log('g3l update process started.')
    spawn( "npm", [ "i", `-g`, 'g3l'], function( error, stdout ) {
        resolve('g3l updated successfully.')
    });
  });
}

function create(command) {
  return new Promise(function(resolve, reject) {
     CR()
       .then((value) => {
         log('Your repository url: ', value);
         opn(value);
         resolve(emoji.emojify(`:sunglasses: Horarayy! You can init your repository easily with this command: g3l -i`));
         process.exit();
       }).catch((err) => {reject(err);});
  });
}

function clone(command) {
  return new Promise(function(resolve, reject) {
      var questions = [
        {
          type: 'input',
          name: 'url',
          message: 'What\'s your git repository url?',
          validate: function (value) {
            if(value.indexOf('.git') > -1 && value.trim().length > 1) {
              return true;
            }
            return 'Please enter a valid git repository';
          }
        },
        {
          type: 'input',
          name: 'name',
          message: 'Which name you prefer for cloned repository directory name?',
          validate: function (value) {
            if (value.trim().length > 1) {
              return true;
            }
            return 'Please enter a valid name repository';
          }
        },
      ];
      inquirer.prompt(questions).then(function (answers) {
        E(`git clone ${answers.url} ${answers.name} && cd ${answers.name}`)
            .then((value) => {resolve('Clone done!')})
            .catch((err) => {reject(err)});
      });
  });
}
