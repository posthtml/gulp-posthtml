var posthtml = require('posthtml');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
var PLUGIN_NAME = 'gulp-posthtml';

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
            .process(String(chunk.contents), options)
            .then(function(result) {
                chunk.contents = new Buffer(result.html);
                cb(null, chunk);
            }).catch(function(err) {
                cb(new PluginError(PLUGIN_NAME, err));
            });
   });
};
