'use strict'

var Error = require('gulp-util').PluginError
var transform = require('through2').obj

var posthtml = require('posthtml')
var posthtmlrc = require('posthtml-load-config')

var PLUGIN_NAME = 'gulp-posthtml'

/**
 * @author Ivan Voishev (@voishev) voischev.ivan@ya.ru
 *
 * @module gulp-posthtml
 * @version 1.6.0
 * @desc Gulp PostHTML Plugin
 *
 * @requires gulp-util
 * @requires through2
 * @requires posthtml
 * @requires posthtml-load-config
 *
 * @param  {Array}  plugins PostHTML Plugins
 * @param  {Object} options PostHTML Options
 *
 * @return {Function}       Stream (Transform)
 */
module.exports = function (plugins, options) {
  return transform(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (!plugins || !Array.isArray(plugins)) {
      posthtmlrc().then(function (config) {
        posthtml(config.plugins)
          .process(file.contents.toString(enc), config.options)
          .then(function (result) {
            file.contents = new Buffer(result.html)
            cb(null, file)
          }, function (err) {
            cb(new Error(PLUGIN_NAME, err))
          })
      })
    }

    if (plugins && Array.isArray(plugins)) {
      posthtml(plugins)
        .process(file.contents.toString(enc), options)
        .then(function (result) {
          file.contents = new Buffer(result.html)
          cb(null, file)
        }, function (err) {
          cb(new Error(PLUGIN_NAME, err))
        })
    }
  })
}
