'use strict'

// Runs in its own process: posthtml before 0.17 keeps a custom parser
// for every later process() call (posthtml/posthtml#421).

const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const File = require('vinyl')

const posthtml = require('..')

const fixtures = path.resolve(__dirname, 'fixtures')

const fixture = (name, contents) => new File({
  cwd: fixtures,
  base: fixtures,
  path: path.join(fixtures, name),
  contents: contents === undefined ? fs.readFileSync(path.join(fixtures, name)) : contents
})

function run (stream, file) {
  return new Promise((resolve, reject) => {
    stream.once('data', resolve)
    stream.once('error', reject)
    stream.end(file)
  })
}

test('resolves plugins and options from a function of the file', async () => {
  let received
  const parser = (html) => [{ tag: 'p', content: [html.trim()] }]
  const stream = posthtml((file) => {
    received = file
    return { plugins: [], options: { parser } }
  })
  const file = await run(stream, fixture('text.txt', Buffer.from('custom parser\n')))

  assert.equal(received, file)
  assert.equal(file.contents.toString(), '<p>custom parser</p>')
})
