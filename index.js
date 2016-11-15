// ------------------------------------
// #GULP - POSTHTML - INDEX
// ------------------------------------

'use strict'

const assign = Object.assign

const dirname = require('path').dirname
const extname = require('path').extname

const Error = require('gulp-util').PluginError
const transform = require('through2').obj

const posthtml = require('posthtml')
const posthtmlrc = require('posthtml-load-config')

const PLUGIN_NAME = 'gulp-posthtml'

/**
 * @author Ivan Voishev (@voishev) <voischev.ivan@ya.ru>
 * @description PostHTML Plugin for Gulp
 * @license MIT
 *
 * @module gulp-posthtml
 * @version 2.0.0
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
  return transform((file, enc, cb) => {
    if (file.isNull()) {
      return cb(null, file)
    }

    const defaults = { from: file.path, to: file.path }

    if (!plugins || !Array.isArray(plugins)) {
      const ctx = assign(
        defaults, plugins, { ext: extname(file.path), dir: dirname(file.path) }
      )

      posthtmlrc(ctx, ctx.dir).then((config) => {
        posthtml(config.plugins)
          .process(file.contents.toString(enc), config.options)
          .then((result) => {
            file.contents = new Buffer(result.html)
            cb(null, file)
          })
          .catch((err) => {
            cb(new Error(PLUGIN_NAME, err))
          })
      })
    }

    if (plugins && Array.isArray(plugins)) {
      options = assign(defaults, options)

      posthtml(plugins)
        .process(file.contents.toString(enc), assign(options, defaults))
        .then((result) => {
          file.contents = new Buffer(result.html)
          cb(null, file)
        })
        .catch((err) => {
          cb(new Error(PLUGIN_NAME, err))
        })
    }
  })
}
