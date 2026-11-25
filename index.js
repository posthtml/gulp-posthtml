'use strict'

const path = require('node:path')
const { Transform } = require('node:stream')

const posthtml = require('posthtml')
const loadConfig = require('posthtml-load-config')
const PluginError = require('plugin-error')

const PLUGIN_NAME = 'gulp-posthtml'

/**
 * Creates a function that resolves `{ plugins, options }` for a file.
 *
 * @param {Array|Function|Object} [plugins] PostHTML plugins, a function `(file) => config`, or a config context
 * @param {Object} [options] PostHTML options, used with an array of plugins
 * @return {Function} `(file) => Promise<{ plugins, options }>`
 */
function configLoader (plugins, options) {
  if (Array.isArray(plugins)) {
    return async () => ({ plugins, options })
  }

  if (typeof plugins === 'function') {
    return async (file) => plugins(file)
  }

  const ctx = plugins || {}

  return async (file) => {
    const configPath = ctx.config ? path.resolve(ctx.config) : file.dirname
    const config = await loadConfig({ file, options: ctx }, configPath)

    if (!config) {
      throw new Error(`PostHTML config could not be loaded from ${configPath}`)
    }

    return config
  }
}

/**
 * PostHTML plugin for Gulp.
 *
 * @module gulp-posthtml
 *
 * @param {Array|Function|Object} [plugins] PostHTML plugins, a function `(file) => ({ plugins, options })`,
 *   or a context for `posthtml.config.js` (`{ config: 'path/to/config/dir', ...ctx }`)
 * @param {Object} [options] PostHTML options, used with an array of plugins
 * @return {Transform} Object mode stream of Vinyl files
 */
module.exports = function gulpPosthtml (plugins, options) {
  const load = configLoader(plugins, options)

  return new Transform({
    objectMode: true,
    transform (file, encoding, callback) {
      if (file.isNull()) {
        callback(null, file)
        return
      }

      if (file.isStream()) {
        callback(new PluginError(PLUGIN_NAME, 'Streams are not supported'))
        return
      }

      load(file)
        .then((config) => posthtml(config.plugins).process(
          file.contents.toString(),
          { from: file.path, to: file.path, ...config.options }
        ))
        .then((result) => {
          file.contents = Buffer.from(result.html)
          callback(null, file)
        }, (error) => {
          callback(new PluginError(PLUGIN_NAME, error, { showStack: true }))
        })
    }
  })
}
