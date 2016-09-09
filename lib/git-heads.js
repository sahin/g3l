var exec = require('child_process').exec,
    Table = require('cli-table'),
    colors = require('cli-table/node_modules/colors'),

    CHUNK_RE = /^([* ]) (\S+)\s+([0-9a-f]+) (.+)$/,
    REMOTE_RE = /^remotes\/([\w.\-]+)\/([\w.\-]+)/,
    msglen,

    branches = {}, //hash of local branch names[1], no values
    remotes = {},  //hash of remote names[2], no values
    meta = {};     //hash to look up git metadata by 'remote,branch'[3]
var emoji = require('node-emoji');
var async = require('async');


function index(star, ref, sha, msg) {
    var branch,
        remote,
        parts = ref.match(REMOTE_RE);

    if (parts) {
        remote = parts[1];
        branch = parts[2];
    } else {
        remote = 'local';
        branch = ref;
        branches[ref] = null; //local branches
    }

    if (!remotes.hasOwnProperty(remote)) {
        remotes[remote] = null; //index all remotes
    }

    meta[[remote, branch].join()] = {star: star, sha: emoji.emojify(sha), msg: emoji.emojify(msg)};
}

function getMeta(repo, branch) {
    return meta[[repo, branch].join()];
}

function format(meta, local, prev) {
    var out = [];
    if (local === meta.sha) {
        //this column/repo branch head sha is same as local one (1st column)
        out.push('✔ '.green);
    } else {
        out.push(meta.sha);
        //optionally show commit message unless it's the same as prev column
        if (msglen && (prev !== meta.sha)) {
            out.push(meta.msg.slice(0, msglen).grey);
        }
    }
    return out.join(' ');
}

function map(remotes, branches) {
    var title = ['branch'].concat(remotes),
        style = {compact: true, 'padding-left': 1, 'padding-right': 2},
        table = new Table({head: title, style: style}),
        blank = {sha: '', msg: ''};

    function perBranch(branch) {
        var localmeta = getMeta('local', branch) || blank,
            star = localmeta.star ? ' ' + localmeta.star : '',
            row = [branch + star.blue],
            lsha = '', //local, for ✔
            psha = ''; //previous, for optional msg dedupe

        function perRow(remote) {
            var head = getMeta(remote, branch) || blank;
            row.push(format(head, lsha, psha));
            if (!lsha) {
                lsha = localmeta.sha;
            }
            psha = head.sha;
        }

        remotes.forEach(perRow);
        table.push(row);
    }

    branches.forEach(perBranch);
    return table;
}

function chunk(err, stdout, stderr) {
      // if (err) {
      //     console.error(stderr);
      //     return process.exit(err.code);
      // }

      stdout.split('\n').forEach(function (str) {
          var parts = str.match(CHUNK_RE);
          if (parts) {
              index(emoji.emojify(parts[1].trim()), emoji.emojify(parts[2]), emoji.emojify(parts[3]), emoji.emojify(parts[4]));
          }
      });

      var output = map(Object.keys(remotes), Object.keys(branches)).toString();
      console.log(output);
}

msglen = 21;

exec('git branch -av', chunk);
