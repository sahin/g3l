var C = require('c0mm1t');
var notifier = require('node-notifier');
var notify = require('./Notify');
var fileSystem = require('./FileSystem');

// Capitalize first letter in text.
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
notify({title: 'g3l', 'message': 'Auto committer triggered..', 'status':'resolve'})

// Lets
const ignoringWatcher = require('ignoring-watcher').createWatcher({
    // Directory to watch. Defaults to process.cwd()
    dir: __dirname,

    // Watch multiple directories instead of a single dir
    dirs: [process.cwd()],

    // One or more ignore patterns
    ignorePatterns: [
        '/node_modules',
        '.git'
    ],

    // The ignore patterns from these ignore files will all
    // be loaded and joined together
    ignoreFiles: [
        '.gitignore'
    ],

    // Only the first existing ignore file (if any) will be loaded and merged
    selectIgnoreFile: [
        '.gitignore'
    ],

    // If no ignore patterns were found via the other properties
    // then these ignore patterns will be used
    defaultIgnorePatterns: [
        '.*'
    ],

    // The following patterns will always be loaded and not impact
    // the loading of the `defaultIgnorePatterns`
    ignoreAlwaysPatterns: [
        'output-file.txt'
    ]
});

function dir() {
  var out = process.cwd().split('/').pop(-1);
  return out;
}

// Insert cwd into config.json

var cwd = process.cwd();
fileSystem.insert(cwd)
  .then((value) => {
    console.log('Config upgraded');
  });

ignoringWatcher
    .on('modified', function(eventArgs) { // Fired for any change event (add, delete, etc.)
        var type = eventArgs.type; // add | addDir | change | unlink | unlinkDir
        var path = eventArgs.path; // The full file system path of the modified file
        console.log(type, path);

        notify({title: 'g3l', 'message': `Handled modification type: ${type}`, 'status':'resolve'})
        console.log(`Handled modification type: ${type}`);

        var message = type.capitalizeFirstLetter() + ' ' + path.split('/').pop(-1);
          try {
            C({ message: message, live: true })
              .then(function (value) {
                notify({title: 'g3l', 'message': 'Git committed successfully', 'status':'resolve'})
              })
              .catch((err) => {
                notify({title: 'g3l', 'message': `Git doesn\'t committed successfully.`, 'status':'reject'})
              })
          }
          catch (err) {
            notify({title: 'g3l', 'message': `Git doesn\'t committed successfully.`, 'status':'reject'})
            console.log('chdir: ' + err);
          }
    });

ignoringWatcher.startWatching(); // Don't forget to start the file watching service
