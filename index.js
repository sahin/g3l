#!/usr/bin/env node
var program = require('commander');
var emoji = require('node-emoji');
var bugsnag = require("bugsnag");
bugsnag.register("ae3b5df916a42d652f9a9dd8c34009bd");
var B = require('br4nch');
var _ = require('underscore');
var C = require('c0mm1t');
var m4g1c = require('m4g1c');
var async = require('async');
var colors = require('colors');
var E = require('3x3c');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
updateNotifier({pkg}).notify();
var CR = require('cr34t3');
var inquirer = require('inquirer');
var cmdify = require('cmdify');

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

function sleep(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(function () {
      resolve('Done', ms);
    }, ms);
  });
}

function run(array) {
  return new Promise(function(resolve, reject) {
     array.forEach(function(piece) {
       if (eval('program.'+piece.name)) {
         console.log(emoji.emojify(':zap:') ,'Running:'.underline, colors.rainbow(piece.name), emoji.emojify(":dark_sunglasses: \n"));
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
          var loader = [
            '/ Initializing.',
            '| Initializing..',
            '\\ Initializing...',
            '- Initializing..'
          ];
          var i = 4;
          var ui = new inquirer.ui.BottomBar({bottomBar: loader[i % 4]});

          setInterval(function () {
            ui.updateBottomBar(loader[i++ % 4]);
          }, 300);

          E(`git init && git remote add origin ${answers.url} && git remote show origin && git symbolic-ref HEAD && echo "# Hi" >> README.md && git add . && git commit -m "Hi" && git push -u origin master`)
              .then((value) => {
                B()
                  .then((out) => {ui.updateBottomBar('Init done!\n');resolve(out)})
                  .catch((err) => {ui.updateBottomBar('Init error!\n', err);reject(err)})
              })
              .catch((err) => {ui.updateBottomBar('Init error!\n', err);reject(err)});
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

function update(command) {
  return new Promise(function(resolve, reject) {
    var cmdify = require('cmdify');

    var loader = [
      '/ Updating g3l..',
      '| Updating g3l...',
      '\\ Updating g3l....',
      '- Updating g3l...'
    ];
    var i = 4;
    var ui = new inquirer.ui.BottomBar({bottomBar: loader[i % 4]});

    setInterval(function () {
      ui.updateBottomBar(loader[i++ % 4]);
    }, 300);

    var spawn = require('child_process').spawn;

    var cmd = spawn(cmdify('npm'), ['-g', 'install', 'g3l'], {stdio: 'pipe'});
    cmd.stdout.pipe(ui.log);
    cmd.on('close', function () {
      ui.updateBottomBar(colors.green('G3l updated successfully!\n'));
      process.exit();
    });
  });
}

function create(command) {
  return new Promise(function(resolve, reject) {
     CR()
       .then((value) => {
         console.log(value);
         console.log(emoji.emojify(`:sunglasses: Horarayy! You can init your repository easily with this command: g3l -i`));
         resolve(emoji.emojify(`:sunglasses: Horarayy! You can init your repository easily with this command: g3l -i`));
       })
       .catch((err) => {reject(err);});
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
            .then((value) => {ui.updateBottomBar('Clone done!\n');resolve('Clone done!')})
            .catch((err) => {ui.updateBottomBar('Clone error!\n', err);reject(err)});
      });
  });
}
