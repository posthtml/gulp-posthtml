var posthtml = require('posthtml');
var through = require('through2');
var gutil = require('gulp-util');
var objectAssign = require('object-assign');
var PluginError = gutil.PluginError;

// Consts
var PLUGIN_NAME = 'gulp-posthtml';

function getMetaInfoFromChunk(chunk) {
  return {
    path: chunk.path
  }
}

module.exports = function(plugins, options) {

    if (!plugins) {
        throw new PluginError(PLUGIN_NAME, 'No plugin?');
    }

    return through.obj(function(chunk, enc, cb) {
        if (chunk.isNull()) {
          // return empty file
          return cb(null, chunk);
        }
        posthtml([].concat(plugins))
            .process(String(chunk.contents),
                objectAssign({}, options, getMetaInfoFromChunk(chunk)))
            .then(function(result) {
                chunk.contents = new Buffer(result.html);
                cb(null, chunk);
            }).catch(function(err) {
                cb(new PluginError(PLUGIN_NAME, err));
            });
   });
};
