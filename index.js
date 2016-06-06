'use strict';

var PostHTML = require('posthtml');
var PluginError = require('gulp-util').PluginError;
var through = require('through2');

// constants
var PLUGIN_NAME = 'gulp-posthtml';

module.exports = function(plugins, options) {

    if (!plugins) {
        throw new PluginError(PLUGIN_NAME, 'No plugin?');
    }

    var posthtml = PostHTML([].concat(plugins));

    return through.obj(function(chunk, enc, cb) {
        if (chunk.isNull()) {
            // return empty file
            return cb(null, chunk);
        }

        posthtml
            .process(chunk.contents.toString(enc), options)
            .then(function(result) {
                chunk.contents = new Buffer(result.html);
                cb(null, chunk);
            }, function(err) {
                cb(new PluginError(PLUGIN_NAME, err));
            });
    });
};
