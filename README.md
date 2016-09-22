<h3 align="center">
  <img src="images/g3l_midnight.png" alt="g3l logo" />
</h3>
<h4 align="center">
  Git is easy, github cli is easy but <b>g3l</b> easiest git cli in the w0rld!
</h4>
<p align="center">
    <a href="https://g3l.download">Checkout new website!</a>
</p>

------------------

[![Version npm](https://img.shields.io/npm/v/g3l.svg?style=flat-square)](https://www.npmjs.com/package/g3l)[![npm Downloads](https://img.shields.io/npm/dm/g3l.svg?style=flat-square)](https://www.npmjs.com/package/g3l)[![Dependencies](https://img.shields.io/david/svtek/g3l.svg?style=flat-square)](https://david-dm.org/svtek/g3l.svg)
[![GitHub stars](https://img.shields.io/github/stars/svtek/g3l.svg?style=social&label=Star&maxAge=2592000)]()
[![NPM](https://nodei.co/npm/g3l.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/g3l/)


# Introduction

    Nowadays, developers are leaving bulky tools, rather
    they use simpler and faster tools.

    Like java based IDE's instead of html based IDE's. (IDE*)

    To give an example WebStorm instead of Atom for web development.

    Both of them are insane but I prefer Atom because is faster than the other.

    We are code ninjas! We don't need bulky gui's.
    We can use terminal as swiss army knife!

    That's the reason, I don't want to use git clients like as SourceTree.


<i>IDE: Integrated development environment</i>

# Motivation

    Did you bored white-black terminal when using git?

    Want auto commit your changes like as bulky IDE's doing?

    Copy paste your bash script into your new baby computer .zshrc / .bashrc file.

<p align="center">
You don't have to do this. <b>DONT DO THAT</b> !
It's not acceptable. :hand:
</p>


# Dependencies

> g3l written in node.js. Node depends on  JavaScript on a VM that is incredibly fast (V8). It is much faster than Ruby, Python, or Perl.
That's the reason you have to install node.
[Download node.js](https://nodejs.org/en/download/)

# Installing

> After you download node you can use command in your terminal called "npm", npm is a package manager for node.

```
npm i g3l -g
```

# Usage
| Short | Full | Description | Params | Example usage | Known issues |
|-------|--------------|----------------------------------------------------------|--------|---------------------------|-----------------------------------------------------------------------|
| -h | --help | Outputs list of commands and usage. | - | g3l -h | - |
| -m | --message | Commit your changes on git then push your current branch | string | g3l -m "Hello world" | - |
| -b | --new_branch | Change your current branch. | string | g3l -b awesome/branchName | This command only create new branch. |
| -p | --publish | Npm version bump and npm publish. | - | g3l -p | This command doing version bump with npm publish. |
| -i | --init | Git init current directory. | - | g3l -i | - |
| -s | --status | Git status current directory. | - | g3l -s | - |
| -c | --create | Create GitHub repository instant. | - | g3l -c | Two factor logins doesn't supporting, creates only GitHub repository. |
| - | --clone | Clone any git repository. | - | g3l --clone | - |
| -u | --update | Self update, g3l. | - | g3l -u | - |
| -e | --enable | Enable auto committer for current directory. | - | g3l -e | - |
| -d | --disable | Disable auto committer for current directory. | - | g3l -d | - |



# Feature's              
+ Instant commit and push process.
+ Create GitHub repository in cli.
+ Your commit message filtered smart algorithm then dress up with emojis. (Not enough smart yet. Like me :smile:)
+ g3l watch your working directory and when you change something, g3l commit changed files insantly. You will be native notified when committing done.

<p align="right"><a href="#top">I'm done, I'll download. :clap:</a></p>

![Demo](images/demo.png)

v10!
Maintenance & Development [Çağatay Çalı](http://github.com/cagataycali)

Made with :heart:
