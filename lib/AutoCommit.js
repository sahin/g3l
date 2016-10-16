var C = require('c0mm1t');
var notifier = require('node-notifier');
var notify = require('./Notify');

// Capitalize first letter in text.
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
notify({title: 'g3l', 'message': 'Auto committer triggered..', 'status':'resolve'})

// Lets
const ignoringWatcher = require('ignoring-watcher').createWatcher({
    // Watch multiple directories instead of a single dir
    dirs: [process.cwd()]
    
});

function dir() {
  var out = process.cwd().split('/').pop(-1);
  return out;
}

ignoringWatcher
    .on('modified', function(eventArgs) { // Fired for any change event (add, delete, etc.)
        var type = eventArgs.type; // add | addDir | change | unlink | unlinkDir
        var path = eventArgs.path; // The full file system path of the modified file
        console.log(type, path);

        var message = type.capitalizeFirstLetter() + ' ' + path.split('/').pop(-1);
        notify({title: 'g3l', 'message': message, 'status':'auto'})

          try {
            C({ message: message, live: true })
              .then(function (value) {
                notify({title: 'g3l', 'message': 'Automatic commit successfully', 'status':'auto'})
              })
              .catch((err) => {
                notify({title: 'g3l', 'message': `Git doesn\'t committed automaticly successfully.`, 'status':'reject'})
              })
          }
          catch (err) {
            notify({title: 'g3l', 'message': `Git doesn\'t committed successfully.`, 'status':'reject'})
            console.log('chdir: ' + err);
          }
    });

ignoringWatcher.startWatching(); // Don't forget to start the file watching service
