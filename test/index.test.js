'use strict'

const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { PassThrough } = require('node:stream')
const File = require('vinyl')

const posthtml = require('..')

const fixtures = path.resolve(__dirname, 'fixtures')
const components = path.join(fixtures, 'components')

const fixture = (name, contents) => new File({
  cwd: fixtures,
  base: fixtures,
  path: path.join(fixtures, name),
  contents: contents === undefined ? fs.readFileSync(path.join(fixtures, name)) : contents
})

const expected = (name) => fs.readFileSync(path.resolve(__dirname, 'expect', name), 'utf8')

function run (stream, file) {
  return new Promise((resolve, reject) => {
    stream.once('data', resolve)
    stream.once('error', reject)
    stream.end(file)
  })
}

test('passes HTML through without plugins', async () => {
  const file = await run(posthtml([]), fixture('index.html'))

  assert.ok(file.isBuffer())
  assert.equal(file.contents.toString(), expected('index.html'))
})

test('applies an array of plugins', async () => {
  const include = require('posthtml-include')({ root: components })
  const file = await run(posthtml([include]), fixture('index.html'))

  assert.equal(file.contents.toString(), expected('html-result.html'))
})

test('passes options and sets from/to to the file path', async () => {
  let treeOptions
  const plugin = (tree) => { treeOptions = tree.options }
  const file = await run(
    posthtml([plugin], { closingSingleTag: 'slash' }),
    fixture('img.html', Buffer.from('<img src="a.png">'))
  )

  assert.equal(file.contents.toString(), '<img src="a.png" />')
  assert.equal(treeOptions.from, file.path)
  assert.equal(treeOptions.to, file.path)
})

test('loads posthtml.config.js next to the file with the given context', async () => {
  const stream = posthtml({ include: { root: components } })
  const file = await run(stream, fixture('index.html'))

  assert.equal(file.contents.toString(), expected('html-result.html'))
})

test('loads posthtml.config.js from the config option', async () => {
  const stream = posthtml({ config: fixtures, include: { root: components } })
  const file = await run(stream, new File({
    path: path.resolve('elsewhere/index.html'),
    contents: fs.readFileSync(path.join(fixtures, 'index.html'))
  }))

  assert.equal(file.contents.toString(), expected('html-result.html'))
})

test('passes null files through', async () => {
  const file = await run(posthtml([]), new File({ path: path.join(fixtures, 'empty.html') }))

  assert.ok(file.isNull())
})

test('rejects streaming files', async () => {
  const file = new File({ path: path.join(fixtures, 'index.html'), contents: new PassThrough() })

  await assert.rejects(run(posthtml([]), file), {
    plugin: 'gulp-posthtml',
    message: 'Streams are not supported'
  })
})

test('emits plugin errors instead of hanging', async () => {
  const plugin = () => { throw new Error('plugin failed') }

  await assert.rejects(run(posthtml([plugin]), fixture('index.html')), {
    plugin: 'gulp-posthtml',
    message: 'plugin failed'
  })
})

test('emits errors from the config function', async () => {
  const stream = posthtml(() => { throw new Error('config failed') })

  await assert.rejects(run(stream, fixture('index.html')), {
    plugin: 'gulp-posthtml',
    message: 'config failed'
  })
})

test('emits an error when posthtml.config.js cannot be loaded', async (t) => {
  t.mock.method(console, 'log', () => {})
  const file = new File({
    path: path.join(fixtures, 'broken-config/index.html'),
    contents: Buffer.from('<p></p>')
  })

  await assert.rejects(run(posthtml(), file), {
    plugin: 'gulp-posthtml',
    message: /PostHTML config could not be loaded/
  })
})
