#!/usr/bin/env node
var C = require('c0mm1t');
var E = require('3x3c');
var I = require('1n1t');
var B = require('br4nch');
var async = require('async');
var spawn = require('child_process').spawn;

var program = require('commander');
program
.option('-m, --message <message>', 'Commit message')
.option('-b, --new_branch <new_branch>', 'Git push origin as a new branch')
.option('-p, --publish', 'After process publish repo as a npm package')
.option('-i, --init', 'Init dir as a git repo')
.option('-c, --create <create>', 'Create repository')
.option('-s, --script', 'Create repository script copy to bash ["zsh", "bash"]')
.parse(process.argv);

function runner(cmd, repo, username) {
  return new Promise(function (resolve, reject) {
    var spawn = require('child_process').spawn;
    var command = spawn(cmd, [repo, username], {
      cwd: process.cwd(),
      stdio: 'inherit'
    });
    var result = '';
    command.stdout.on('data', function(data) {
         result += data.toString();
    });
    command.on('close', function(code) {
        resolve(result);
    });
  })
}

if (program.script) {
  E(`git clone https://github.com/cagataycali/create ~/.create/ && sudo echo "alias create=$HOME/.create/create.sh" >> ~/.zshrc && sudo chmod -R 777 ~/.create/create.sh`)
  .then((value) => {console.log('Bash script copied');})
  .catch((err) => {console.log(err);})
} // && sudo echo "alias create=$HOME/.create/create.sh" >> ~/.zshrc

if (program.create && !program.init) {
  E(`git config user.name`) // Be sure your git.config.username equal your github username
    .then((username) => {
      runner('create', program.create, username)
      // runner('sudo ~/.create/create.sh', program.create, username)
        .then((value) => {console.log(value);})
        .catch((err) => {console.log(err);})
    })
    .catch((err) => {console.log(err)});
}

if (program.init && !program.create) {
  var prompt = require('prompt');
  prompt.start();
  prompt.get([{name:'url', required: true, description: "Git remote url: Ex. https://github.com/cagataycali/br4anch.git"}], function (err, result) {
    E(`git init && git remote add origin ${result.url} && echo "# Hi" >> README.md && git add . && git commit -m "Hi" && git push -u origin master`)
      .then((value) => {console.log(value.split('/').pop(-1))})
      .catch((err) => {console.log(err)});
  });
}

if (program.new_branch && program.message && !program.publish && !program.init) {
 E(`git checkout -b ${program.new_branch}`)
   .then((value) => {
     console.log(`New branch created as ${program.new_branch}`);
     if (program.message) {
       C(program.message)
         .then(function(value) {
           console.log(value)
         })
         .catch(function(err) {console.log(err)});
       } else {
         console.log('Use like this: \n gcom -m "Message"');
       }
   });
}

if (program.new_branch && program.message && !program.publish && program.init) {
  var prompt = require('prompt');
  prompt.start();
  prompt.get([{name:'url', required: true, description: "Git remote url: Ex. https://github.com/cagataycali/br4anch.git"}], function (err, result) {
    E(`git init && git remote add origin ${result.url} && echo "# Hi" >> README.md && git add . && git commit -m "Hi" && git push -u origin master`)
      .then((value) => {
        console.log(value.split('/').pop(-1))
        E(`git checkout -b ${program.new_branch}`)
          .then((value) => {
            console.log(`New branch created as ${program.new_branch}`);
            if (program.message) {
              C(program.message, program.new_branch)
                .then(function(value) {
                  console.log(value)
                })
                .catch(function(err) {console.log(err)});
              } else {
                console.log('Use like this: \n gcom -m "Message"');
              }
          });
        })
      .catch((err) => {console.log(err)});
  });
}

if (program.new_branch && program.message && program.publish && program.init) {
  var prompt = require('prompt');
  prompt.start();
  prompt.get([{name:'url', required: true, description: "Git remote url: Ex. https://github.com/cagataycali/br4anch.git"}], function (err, result) {
    E(`git init && git remote add origin ${result.url} && echo "# Hi" >> README.md && git add . && git commit -m "Hi" && git push -u origin master`)
      .then((value) => {
        console.log(value.split('/').pop(-1))
        E(`git checkout -b ${program.new_branch}`)
          .then((value) => {
            console.log(`New branch created as ${program.new_branch}`);
            if (program.message) {
              C(program.message, program.new_branch)
                .then(function(value) {
                  console.log(value)
                  E('npm version patch && npm publish')
                    .then((value) => {console.log(value);})
                    .catch((err) => {console.log(err);})
                })
                .catch(function(err) {console.log(err)});
              } else {
                console.log('Use like this: \n gcom -m "Message"');
              }
          });
        })
      .catch((err) => {console.log(err)});
  });
}

if (program.message && !program.init && !program.new_branch && !program.publish) {
  C(program.message)
    .then(function(value) {
      console.log(value)
    })
    .catch(function(err) {console.log(err)});
}

if (program.message && program.publish && !program.init && !program.new_branch) {
  C(program.message)
    .then(function(value) {
      console.log(value);
      console.log('Codes publishing now!');
      E('npm version patch && npm publish')
        .then((value) => {console.log(value);})
        .catch((err) => {console.log(err);})
    })
    .catch(function(err) {console.log(err)});
}

if (program.publish && !program.init && !program.new_branch && !program.message) {
  console.log('Codes publishing now!');
  E('npm version patch && npm publish')
    .then((value) => {console.log(value);})
    .catch((err) => {console.log(err);})
}
