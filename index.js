// ------------------------------------
// #GULP - POSTHTML - INDEX
// ------------------------------------

'use strict'

const path = require('path')

const transform = require('through2').obj

const PLUGIN_NAME = 'gulp-posthtml'

const posthtml = require('posthtml')
const posthtmlrc = require('posthtml-load-config')

const Error = require('plugin-error')

function rc (cb) {
  return function (plugins, options) {
    if (Array.isArray(plugins)) {
      return cb(() => Promise.resolve({ plugins: plugins, options: options }))
    } else if (typeof plugins === 'function') {
      return cb((file) => Promise.resolve(plugins(file)))
    } else {
      const ctx = plugins || {}

      return cb((file) => {
        const config = {}

        if (ctx.config) {
          config.path = path.resolve(ctx.config)
        } else {
          config.path = file.dirname
        }

        config.ctx = { file: file, options: ctx }

        return posthtmlrc(config.ctx, config.path)
      })
    }
  }
}
/**
 * @author Ivan Voishev (@voishev) <voischev.ivan@ya.ru>
 * @description PostHTML Plugin for Gulp
 * @license MIT
 *
 * @module gulp-posthtml
 * @version 3.0.0
 *
 * @requires plugin-error
 * @requires through2
 * @requires posthtml
 * @requires posthtml-load-config
 *
 * @method gulp-posthtml
 *
 * @param  {Array}  plugins PostHTML Plugins
 * @param  {Object} options PostHTML Options
 *
 * @return {Function}       Stream (Transform)
 */
module.exports = rc((loadConfig) => {
  return transform((file, enc, cb) => {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return new Error(`Streams are not supported by ${PLUGIN_NAME}`)
    }

    loadConfig(file).then((config) => {
      config.options = Object.assign(
        { from: file.path, to: file.path }, config.options
      )

      return posthtml(config.plugins)
        .process(file.contents.toString(enc), config.options)
        .then((result) => {
          file.contents = new Buffer(result.html)
          cb(null, file)
        })
        .catch((err) => {
          cb(new Error(PLUGIN_NAME, err))
        })
    })
  })
})
